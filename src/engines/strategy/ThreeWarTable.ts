/**
 * ThreeWarTable.ts — 100% Authentic 3D Tactical War Table (Three.js v0.186)
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * BẢO TỒN 100% NGUYÊN TÁC SA BÀN 3D:
 * - Bàn sa bàn gỗ mun sơn mài (Dark Rosewood) nẹp đồng 4 góc (d4af37)
 * - Nền lụa bản đồ cổ antique silk texture: assets/images/bg_saban_table.jpg
 * - Quân tiêu 3D cắm cờ phướn lụa chữ triện canvas 512x256 (High-DPI font)
 * - Đèn lồng đuốc quân cơ nhấp nháy tự nhiên (PointLight sin/cos) + ánh trăng bạc viền mép bàn
 * - Raycaster chọn cứ điểm, kéo rê bàn (pan/drag), lăn chuột phóng to thu nhỏ (lerp zoom)
 * - Trúc Giản Quân Cơ (bamboo-scroll-panel) hiển thị thông tin quân sự và các lệnh bài
 */

import warTableTemplate from './war-table.html?raw';
import * as THREE from 'three';
import { GameStateStore } from '../../core/GameStateStore';
import { EventBus } from '../../core/EventBus';
import { AudioSynthesizer } from '../../audio/AudioSynthesizer';

declare const window: any;
declare const document: any;

interface ProvinceInfo {
  name: string;
  type: string;
  ruler: string;
  status: string;
  threat: string;
  income: string;
  dist: string;
  intel: string;
  garrison: string;
  desc: string;
  actionPrompt: string;
  actionCost: string;
}

const PROVINCE_DATA: Record<string, ProvinceInfo> = {
  dedo: {
    name: "Đại Vũ Kinh Đô (Kim Loan Điện)",
    type: "Đế Đô",
    ruler: "Vũ Hoàng",
    status: "Nghi Kỵ Giám Sát",
    threat: "An Ninh Cảnh Giới",
    income: "Triều Cống 1.200 Vàng",
    dist: "Hậu Phương Triều Đình",
    intel: "Cẩm Y Vệ & Nội Các",
    garrison: "50.000 Ngự Lâm Quân",
    desc: "Trung tâm quyền lực hoàng triều Đại Vũ. Vũ Hoàng đa nghi theo dõi nhất cử nhất động của phò mã phủ. Cần dâng biểu, tiến cống vàng để giải tỏa lòng ngờ vực.",
    actionPrompt: "Tiến Cống Giảm Nghi Kỵ",
    actionCost: "Tiêu hao 1 Lệnh (-15% Nghi Kỵ)"
  },
  khainguyen: {
    name: "Khai Nguyên (Đại Kho Lương)",
    type: "Hậu Cần",
    ruler: "Trấn Bắc Quân Hậu Cần",
    status: "An Cư Lạc Nghiệp",
    threat: "An Toàn Tuyệt Đối",
    income: "+5.000 Thạch Lương/Tháng",
    dist: "2 Ngày Đến Thanh Châu",
    intel: "Thương Hội Vệ Ti Vũ",
    garrison: "5.000 Binh Hộ Lương",
    desc: "Hậu cần trung chuyển quân lương cho toàn tuyến biên cương. Quý Bình An tích trữ 5 vạn thạch lương tại đây thông qua thương hội Vệ Ti Vũ, bảo đảm sĩ khí ba quân không bao giờ cạn.",
    actionPrompt: "Tiếp Nhận Quân Lương",
    actionCost: "Tiêu hao 1 Lệnh (+5.000 Thạch Lương)"
  },
  thanhchau: {
    name: "Thành Thanh Châu (Tiền Tuyến)",
    type: "Tiền Tuyến",
    ruler: "Chinh Bắc Quân (Quý Bình An)",
    status: "Khói Lửa Chiến Tranh",
    threat: "Báo Động: 20.000 Quân Nam Ly Áp Sát!",
    income: "+3.500 Vàng (Xưởng Thấu Hoa Cao)",
    dist: "3 Ngày Đến Đế Đô",
    intel: "Hồng Nhan Mật Thám",
    garrison: "Triệu Vân + 800 Hãm Trận Doanh",
    desc: "Cửa ải yết hầu che chở toàn bộ ba châu Bắc Cảnh. Giả Hủ đã bí mật đắp đê ngăn dòng thượng nguồn sông Thanh Thủy. Thành cao hào sâu, có thể cầm cự trước nhiều đợt tấn công của Địch Hỏa.",
    actionPrompt: "Mở Rộng Xưởng Thấu Hoa Cao",
    actionCost: "Tiêu hao 1 Lệnh (+3.000 Vàng)"
  },
  baccoson: {
    name: "Bắc Cô Sơn (Hiểm Quan)",
    type: "Hiểm Quan",
    ruler: "Trấn Bắc Quân Phục Kỵ",
    status: "Bố Trí Trận Địa",
    threat: "Phục Binh Sẵn Sàng",
    income: "Kiểm Soát Sơn Đạo",
    dist: "1 Ngày Đến Thanh Châu",
    intel: "Bạch Mã Tiền Tiêu",
    garrison: "3.000 Bạch Mã Nghĩa Tòng",
    desc: "Địa hình núi non hiểm trở, thắt cổ chai đón lõng đường rút lui của địch. Nơi bố trí phục binh cung nỏ và kỵ binh cơ động sẵn sàng đánh bọc sườn quân Nam Ly.",
    actionPrompt: "Bố Trí Cạm Bẫy Phục Kích",
    actionCost: "Tiêu hao 1 Lệnh (+15 Sĩ Khí)"
  },
  lieuchau: {
    name: "Liễu Châu (Hậu Phương Bắc Cảnh)",
    type: "Bắc Cảnh",
    ruler: "Bắc Cảnh Trấn Phủ Ty",
    status: "Thái Bình Ổn Định",
    threat: "Ổn Định Tuyệt Đối",
    income: "+2.000 Vàng & 100 Ngựa Chiến",
    dist: "2 Ngày Đến Bắc Cô Sơn",
    intel: "Thiên Cơ Lâu Mật Tuyến",
    garrison: "8.000 Thủ Thành Quân",
    desc: "Căn cứ địa trù phú của 3 châu phương Bắc, nơi cung cấp tuấn mã chiến trường và nhân lực thợ rèn đúc giáp trụ thép cho quân đội Quý Bình An.",
    actionPrompt: "Chiêu Mộ Tân Binh",
    actionCost: "Tiêu hao 1 Lệnh (+500 Binh Lực)"
  },
  namly: {
    name: "Nam Ly Doanh (Tiền Tiêu Địch)",
    type: "Địch Doanh",
    ruler: "Tiên Phong Địch Hỏa (Nam Ly Quốc)",
    status: "Bao Vây Chiến Thành",
    threat: "Địch Hỏa 20.000 Quân Tinh Nhuệ",
    income: "Địch Binh Chiếm Đóng",
    dist: "Đối Mặt Trực Diện",
    intel: "Mật Báo Quân Doanh",
    garrison: "20.000 Thiết Giáp Tượng Binh",
    desc: "Đại doanh tiền phương của Nam Ly Vương triều do đại tướng Địch Hỏa chỉ huy. Bày trận hãm thành chuẩn bị nuốt chửng Thanh Châu hòng mở toang cánh cửa tiến thẳng về kinh đô Đại Vũ.",
    actionPrompt: "Thám Sát Trận Địa Địch",
    actionCost: "Tiêu hao 1 Lệnh (-5% Nguy Cơ)"
  },
  baccanh: {
    name: "Thành Thanh Châu (Tiền Tuyến)",
    type: "Tiền Tuyến",
    ruler: "Chinh Bắc Quân (Quý Bình An)",
    status: "Khói Lửa Chiến Tranh",
    threat: "Báo Động: 20.000 Quân Nam Ly Áp Sát!",
    income: "+3.500 Vàng (Xưởng Thấu Hoa Cao)",
    dist: "3 Ngày Đến Đế Đô",
    intel: "Hồng Nhan Mật Thám",
    garrison: "Triệu Vân + 800 Hãm Trận Doanh",
    desc: "Cửa ải yết hầu che chở toàn bộ ba châu Bắc Cảnh. Giả Hủ đã bí mật đắp đê ngăn dòng thượng nguồn sông Thanh Thủy.",
    actionPrompt: "Mở Rộng Xưởng Thấu Hoa Cao",
    actionCost: "Tiêu hao 1 Lệnh (+3.000 Vàng)"
  }
};

export class ThreeWarTable {
  private container: HTMLElement;
  private store: GameStateStore;
  private bus: EventBus;
  private audio: AudioSynthesizer;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private tokenObjects: THREE.Group[] = [];
  private isInitialized: boolean = false;

  constructor(containerId: string, store: GameStateStore, bus: EventBus, audio: AudioSynthesizer) {
    this.container = document.getElementById(containerId) || document.body;
    this.store = store;
    this.bus = bus;
    this.audio = audio;

    this.mountHTML();
    this.bindDOM();
    this.initThree();
  }

  private mountHTML(): void {
    this.container.innerHTML = warTableTemplate;
  }

  private bindDOM(): void {
    const btnBattle = document.getElementById('btn-action-battle');
    if (btnBattle) {
      btnBattle.addEventListener('click', () => {
        this.audio.playWarDrum();
        this.bus.emit('CHANGE_VIEW', 'battle');
      });
    }

    const btnSoap = document.getElementById('btn-action-soap');
    if (btnSoap) {
      btnSoap.addEventListener('click', () => {
        const s = this.store.getState();
        if (s.ap < 1) {
          this.bus.emit('SHOW_TOAST', '[ 警 · QUÂN CẢNH ] Hết Điểm Lệnh (AP) trong ngày!');
          return;
        }
        this.audio.playSealStamp();
        this.store.setState({
          ap: s.ap - 1,
          gold: s.gold + 3000
        });
        this.bus.emit('SHOW_TOAST', '[ 餉 · THƯƠNG NGÂN ] Xưởng Thấu Hoa Cao mở rộng! +3.000 Vàng ròng!');
      });
    }

    const btnTribute = document.getElementById('btn-action-tribute');
    if (btnTribute) {
      btnTribute.addEventListener('click', () => {
        const s = this.store.getState();
        if (s.gold < 1500) {
          this.bus.emit('SHOW_TOAST', '[ 警 · QUÂN CẢNH ] Không đủ 1.500 Vàng để cống nạp!');
          return;
        }
        this.audio.playSealStamp();
        this.store.setState({
          gold: s.gold - 1500,
          suspicion: Math.max(0, s.suspicion - 15)
        });
        this.bus.emit('SHOW_TOAST', '[ 奏 · DÂNG BIỂU ] Dâng biểu xoa dịu hoàng đế thành công! Giảm 15% Nghi Kỵ.');
      });
    }

    const btnToggleBamboo = document.getElementById('btn-toggle-bamboo');
    const bambooPanel = document.getElementById('bamboo-scroll-panel');
    if (btnToggleBamboo && bambooPanel) {
      btnToggleBamboo.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.playWoodClick();
        bambooPanel.classList.toggle('collapsed');
      });
    }
  }

  private initThree(): void {
    const canvasContainer = document.getElementById('saban-threejs-container');
    if (!canvasContainer || this.isInitialized) return;
    this.isInitialized = true;

    try {
      canvasContainer.innerHTML = '';
      canvasContainer.style.pointerEvents = 'auto';
      const w = canvasContainer.clientWidth || 1000;
      const h = canvasContainer.clientHeight || 650;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x06080b);

      this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000);
      this.camera.position.set(0, -110, 160);
      this.camera.lookAt(0, 0, 0);

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      canvasContainer.appendChild(this.renderer.domElement);

      // Warm candle / lantern ambient light
      const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
      this.scene.add(ambientLight);

      // Flickering campaign tent lantern (Point light)
      const lanternLight = new THREE.PointLight(0xf59e0b, 2.8, 600);
      lanternLight.position.set(30, -35, 95);
      this.scene.add(lanternLight);

      // Secondary cool moonlight rim light
      const moonRimLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
      moonRimLight.position.set(-80, 80, 120);
      this.scene.add(moonRimLight);

      // 1. Dark Rosewood War Council Table Base
      const tableBaseGeo = new THREE.BoxGeometry(320, 210, 8);
      const tableBaseMat = new THREE.MeshStandardMaterial({
        color: 0x140e09,
        roughness: 0.75,
        metalness: 0.2
      });
      const tableBase = new THREE.Mesh(tableBaseGeo, tableBaseMat);
      tableBase.position.set(0, 0, -5);
      this.scene.add(tableBase);

      // Brass Corner Brackets on table
      const cornerGeo = new THREE.BoxGeometry(16, 16, 10);
      const cornerMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.35,
        metalness: 0.85
      });
      [[-155, -100], [155, -100], [-155, 100], [155, 100]].forEach(([cx, cy]) => {
        const cornerMesh = new THREE.Mesh(cornerGeo, cornerMat);
        cornerMesh.position.set(cx, cy, -4);
        this.scene.add(cornerMesh);
      });

      // 2. The Antique Silk War Map (Direct Texture)
      const mapTexture = new THREE.TextureLoader().load('assets/images/bg_saban_table.jpg');
      mapTexture.generateMipmaps = true;
      mapTexture.minFilter = THREE.LinearMipmapLinearFilter;

      const mapGeo = new THREE.PlaneGeometry(290, 185, 32, 20);
      const mapMat = new THREE.MeshStandardMaterial({
        map: mapTexture,
        roughness: 0.88,
        metalness: 0.08
      });
      const mapMesh = new THREE.Mesh(mapGeo, mapMat);
      mapMesh.position.set(0, 0, 0);
      this.scene.add(mapMesh);

      // Texture Generators for Silk Pennants & Bronze Plates
      const createFlagTexture = (sealChar: string, subText: string, isEnemy?: boolean, isSiege?: boolean) => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.Texture();

        const grad = ctx.createLinearGradient(0, 0, 512, 256);
        if (isEnemy) {
          grad.addColorStop(0, '#5c1414');
          grad.addColorStop(1, '#2d0a0a');
        } else if (isSiege) {
          grad.addColorStop(0, '#59320e');
          grad.addColorStop(1, '#261505');
        } else {
          grad.addColorStop(0, '#221912');
          grad.addColorStop(1, '#120d09');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 256);

        ctx.strokeStyle = isEnemy ? '#f87171' : (isSiege ? '#fbbf24' : '#d4af37');
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, 492, 236);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, 472, 216);

        ctx.fillStyle = isEnemy ? '#fca5a5' : '#f6d89b';
        ctx.font = 'bold 112px "ZCOOL XiaoWei", "Noto Serif SC", "Songti SC", "SimSun", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sealChar, 256, 108);

        ctx.fillStyle = isEnemy ? '#f87171' : '#c5a059';
        ctx.font = 'bold 34px "Playfair Display", "Cormorant Garamond", "Lora", serif';
        ctx.fillText(subText, 256, 196);

        const tex = new THREE.CanvasTexture(canvas);
        tex.generateMipmaps = true;
        return tex;
      };

      const createSealPlateTexture = (sealChar: string, isEnemy?: boolean) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.Texture();

        ctx.fillStyle = isEnemy ? '#451212' : '#241a12';
        ctx.beginPath();
        ctx.arc(128, 128, 120, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isEnemy ? '#b91c1c' : '#d4af37';
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.fillStyle = isEnemy ? '#fca5a5' : '#fbbf24';
        ctx.font = 'bold 128px "ZCOOL XiaoWei", "Noto Serif SC", "Songti SC", "SimSun", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sealChar, 128, 136);

        const tex = new THREE.CanvasTexture(canvas);
        tex.generateMipmaps = true;
        return tex;
      };

      // 3. 3D War Tokens Configuration
      const tokenConfigs = [
        { key: 'dedo', name: 'Đại Vũ Kinh Đô', x: -36, y: -26, sealChar: '武', sub: 'KINH ĐÔ', baseCol: 0x1c150e, trimCol: 0xd4af37, auraCol: 0xd4af37, isCapital: true },
        { key: 'khainguyen', name: 'Khai Nguyên', x: -22, y: -8, sealChar: '粮', sub: 'KHO LƯƠNG', baseCol: 0x161b20, trimCol: 0x60a5fa, auraCol: 0x38bdf8 },
        { key: 'thanhchau', name: 'Thành Thanh Châu', x: 28, y: 4, sealChar: '青', sub: 'TIỀN TUYẾN', baseCol: 0x22160e, trimCol: 0xf59e0b, auraCol: 0xf59e0b, isSiege: true },
        { key: 'baccoson', name: 'Bắc Cô Sơn', x: -4, y: 22, sealChar: '关', sub: 'HIỂM QUAN', baseCol: 0x1c1712, trimCol: 0xd4af37, auraCol: 0xd4af37 },
        { key: 'lieuchau', name: 'Liễu Châu', x: 52, y: 18, sealChar: '北', sub: 'BẮC CẢNH', baseCol: 0x141f1a, trimCol: 0x34d399, auraCol: 0x10b981 },
        { key: 'namly', name: 'Nam Ly Doanh', x: 42, y: -24, sealChar: '南', sub: 'ĐỊCH DOANH', baseCol: 0x280e0e, trimCol: 0xef4444, auraCol: 0xef4444, isEnemy: true }
      ];

      this.tokenObjects = [];

      tokenConfigs.forEach(cfg => {
        const group = new THREE.Group();
        group.position.set(cfg.x, cfg.y, 0);
        group.userData = cfg;

        const baseRadius = cfg.isCapital ? 7.5 : (cfg.isSiege ? 6.5 : 5.5);

        // Ebony Base
        const baseGeo = new THREE.CylinderGeometry(baseRadius * 0.88, baseRadius, 3.2, 32);
        const baseMat = new THREE.MeshStandardMaterial({ color: cfg.baseCol, roughness: 0.75, metalness: 0.2 });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.rotation.x = Math.PI / 2;
        baseMesh.position.z = 1.6;
        group.add(baseMesh);

        // Torus Rim
        const rimGeo = new THREE.TorusGeometry(baseRadius * 0.94, 0.65, 12, 32);
        const rimMat = new THREE.MeshStandardMaterial({ color: cfg.trimCol, roughness: 0.35, metalness: 0.85 });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.position.z = 3.2;
        group.add(rimMesh);

        // Seal Plate
        const sealPlateTex = createSealPlateTexture(cfg.sealChar, cfg.isEnemy);
        const plateGeo = new THREE.CircleGeometry(baseRadius * 0.76, 32);
        const plateMat = new THREE.MeshStandardMaterial({ map: sealPlateTex, roughness: 0.4, metalness: 0.7 });
        const plateMesh = new THREE.Mesh(plateGeo, plateMat);
        plateMesh.position.z = 3.25;
        group.add(plateMesh);

        // Flagstaff Pole
        const staffGeo = new THREE.CylinderGeometry(0.45, 0.45, 20, 12);
        const staffMat = new THREE.MeshStandardMaterial({ color: cfg.trimCol, metalness: 0.85, roughness: 0.3 });
        const staffMesh = new THREE.Mesh(staffGeo, staffMat);
        staffMesh.rotation.x = Math.PI / 2;
        staffMesh.position.set(0, 0, 11);
        group.add(staffMesh);

        // Tip
        const tipGeo = new THREE.ConeGeometry(1.2, 3.5, 12);
        const tipMesh = new THREE.Mesh(tipGeo, staffMat);
        tipMesh.rotation.x = -Math.PI / 2;
        tipMesh.position.set(0, 0, 22.5);
        group.add(tipMesh);

        // Pennant Flag
        const flagTex = createFlagTexture(cfg.sealChar, cfg.sub, cfg.isEnemy, cfg.isSiege);
        const flagGeo = new THREE.PlaneGeometry(15, 7.5);
        const flagMat = new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide });
        const flagMesh = new THREE.Mesh(flagGeo, flagMat);
        flagMesh.position.set(7.5, 0, 16);
        flagMesh.rotation.x = Math.PI / 2;
        group.add(flagMesh);

        // Ground Aura
        const auraGeo = new THREE.RingGeometry(baseRadius + 1.2, baseRadius + 3.5, 32);
        const auraMat = new THREE.MeshBasicMaterial({ color: cfg.auraCol, side: THREE.DoubleSide, transparent: true, opacity: 0.32 });
        const auraMesh = new THREE.Mesh(auraGeo, auraMat);
        auraMesh.position.z = 0.2;
        group.add(auraMesh);

        group.userData.auraMesh = auraMesh;
        group.userData.flagMesh = flagMesh;
        group.userData.plateMesh = plateMesh;
        group.userData.cfg = cfg;

        // Hit Collider
        const hitGeo = new THREE.CylinderGeometry(baseRadius * 1.5, baseRadius * 1.5, 26, 16);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.rotation.x = Math.PI / 2;
        hitMesh.position.z = 12;
        group.add(hitMesh);

        this.scene.add(group);
        this.tokenObjects.push(group);
      });

      // Ambient Lantern Embers
      const emberCount = 40;
      const emberGeo = new THREE.BufferGeometry();
      const emberPositions = new Float32Array(emberCount * 3);
      const emberSpeeds = new Float32Array(emberCount);
      for (let i = 0; i < emberCount; i++) {
        emberPositions[i * 3] = (Math.random() - 0.5) * 180;
        emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        emberPositions[i * 3 + 2] = Math.random() * 80 + 5;
        emberSpeeds[i] = 0.08 + Math.random() * 0.12;
      }
      emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
      const emberMat = new THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 2.2,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const emberPoints = new THREE.Points(emberGeo, emberMat);
      this.scene.add(emberPoints);

      // Raycaster & Mouse Drag/Zoom Controls
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let hoveredToken: any = null;
      const defaultCameraPos = new THREE.Vector3(0, -110, 160);
      const defaultLookAt = new THREE.Vector3(0, 0, 0);
      const targetCameraPos = defaultCameraPos.clone();
      const targetLookAt = defaultLookAt.clone();
      const currentLookAt = defaultLookAt.clone();

      let isMouseDown = false;
      let isDragging = false;
      let dragStartX = 0;
      let dragStartY = 0;
      let cameraStartX = 0;
      let cameraStartY = 0;
      let lookAtStartX = 0;
      let lookAtStartY = 0;

      canvasContainer.style.cursor = 'grab';

      canvasContainer.addEventListener('mousedown', (event: MouseEvent) => {
        if (event.button !== 0 && event.button !== 2) return;
        isMouseDown = true;
        isDragging = false;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        cameraStartX = targetCameraPos.x;
        cameraStartY = targetCameraPos.y;
        lookAtStartX = targetLookAt.x;
        lookAtStartY = targetLookAt.y;
      });

      window.addEventListener('mousemove', (event: MouseEvent) => {
        const rect = canvasContainer.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        if (isMouseDown) {
          const deltaX = event.clientX - dragStartX;
          const deltaY = event.clientY - dragStartY;
          if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
            isDragging = true;
            canvasContainer.style.cursor = 'grabbing';
            const panFactor = (targetCameraPos.z / 160) * 0.22;
            targetCameraPos.x = Math.max(-70, Math.min(70, cameraStartX - deltaX * panFactor));
            targetCameraPos.y = Math.max(-160, Math.min(-60, cameraStartY + deltaY * panFactor));
            targetLookAt.x = Math.max(-70, Math.min(70, lookAtStartX - deltaX * panFactor));
            targetLookAt.y = Math.max(-40, Math.min(40, lookAtStartY + deltaY * panFactor));
          }
          return;
        }

        // Token Hover Raycast
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.tokenObjects, true);

        if (intersects.length > 0) {
          let root: any = intersects[0].object;
          while (root.parent && root.parent !== this.scene) root = root.parent;
          if (root.userData && root.userData.key) {
            if (hoveredToken !== root) {
              if (hoveredToken) hoveredToken.position.z = 0;
              hoveredToken = root;
            }
            canvasContainer.style.cursor = 'pointer';
            return;
          }
        }

        if (hoveredToken) {
          hoveredToken.position.z = 0;
          hoveredToken = null;
        }
        canvasContainer.style.cursor = 'grab';
      });

      window.addEventListener('mouseup', (event: MouseEvent) => {
        if (!isMouseDown) return;
        isMouseDown = false;

        if (isDragging) {
          isDragging = false;
          canvasContainer.style.cursor = 'grab';
          return;
        }

        // Click selection
        const rect = canvasContainer.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.tokenObjects, true);

        if (intersects.length > 0) {
          let root: any = intersects[0].object;
          while (root.parent && root.parent !== this.scene) root = root.parent;
          if (root.userData && root.userData.key) {
            this.select3DToken(root.userData.key, targetCameraPos, targetLookAt);
            return;
          }
        }

        // Clicked outside -> smoothly reset
        targetCameraPos.copy(defaultCameraPos);
        targetLookAt.copy(defaultLookAt);
      });

      canvasContainer.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        const zoomDelta = event.deltaY * 0.12;
        const newZ = Math.max(90, Math.min(220, targetCameraPos.z + zoomDelta));
        targetCameraPos.z = newZ;
        targetCameraPos.y = -newZ * 0.68;
      }, { passive: false });

      let time = 0;
      const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        time += 0.02;

        lanternLight.intensity = 2.6 + Math.sin(time * 4) * 0.35 + Math.cos(time * 7) * 0.15;

        this.tokenObjects.forEach((tok: any, idx) => {
          if (tok.userData.auraMesh) {
            const scale = 1 + Math.sin(time * 2.2 + idx) * 0.08;
            tok.userData.auraMesh.scale.set(scale, scale, 1);
          }
        });

        if (hoveredToken) {
          hoveredToken.position.z = Math.min(hoveredToken.position.z + 0.25, 3.5);
        }

        const posAttr = emberGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < emberCount; i++) {
          let z = posAttr.getZ(i) + emberSpeeds[i];
          if (z > 95) {
            z = 5;
            posAttr.setX(i, (Math.random() - 0.5) * 180);
            posAttr.setY(i, (Math.random() - 0.5) * 120);
          }
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;

        this.camera.position.lerp(targetCameraPos, 0.05);
        currentLookAt.lerp(targetLookAt, 0.05);
        this.camera.lookAt(currentLookAt);

        this.renderer.render(this.scene, this.camera);
      };
      renderLoop();

      window.addEventListener('resize', () => this.resize());

      console.log('[Three.js] 3D tactical relief war sand-table active with real texture and 3D tokens');
    } catch (err) {
      console.warn('Three.js init error:', err);
    }
  }

  public onViewActivated(): void {
    this.resize();
    const curSelected = this.store.getState().selectedNode || 'thanhchau';
    this.renderMapNodeDetails(curSelected);
  }

  public resize(): void {
    const canvasContainer = document.getElementById('saban-threejs-container');
    if (!canvasContainer || !this.renderer || !this.camera) return;
    const newW = canvasContainer.clientWidth || window.innerWidth || 1000;
    const newH = canvasContainer.clientHeight || window.innerHeight || 650;
    this.camera.aspect = newW / newH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newW, newH);
  }

  public select3DToken(key: string, targetCameraPos?: THREE.Vector3, targetLookAt?: THREE.Vector3): void {
    const tok = this.tokenObjects.find(t => t.userData.key === key);
    if (!tok) return;

    if (targetCameraPos && targetLookAt) {
      targetCameraPos.set(tok.userData.x * 0.45, tok.userData.y * 0.45 - 90, 140);
      targetLookAt.set(tok.userData.x, tok.userData.y, 0);
    }

    this.renderMapNodeDetails(key);
    this.bus.emit('TRIGGER_LIGHTNING', '#fbbf24');
    this.bus.emit('SHOW_TOAST', `[ 輿 · KHẢO SÁT ] Chuyển tầm mắt Sa Bàn tới: ${tok.userData.name}`);
  }

  private renderMapNodeDetails(nodeKey: string): void {
    const data = PROVINCE_DATA[nodeKey] || PROVINCE_DATA.thanhchau;
    if (!data) return;

    const badgeEl = document.getElementById('panel-city-badge');
    if (badgeEl) badgeEl.textContent = data.type.toUpperCase();

    const nameEl = document.getElementById('panel-city-name');
    if (nameEl) nameEl.textContent = data.name.toUpperCase();

    const threatEl = document.getElementById('panel-city-threat');
    if (threatEl) threatEl.innerHTML = `<span>${data.threat}</span>`;

    const descEl = document.getElementById('panel-city-desc');
    if (descEl) descEl.textContent = data.desc;

    const garrisonEl = document.getElementById('panel-garrison');
    if (garrisonEl) garrisonEl.textContent = data.garrison;

    const foodEl = document.getElementById('panel-food');
    if (foodEl) foodEl.textContent = data.income;

    const distEl = document.getElementById('panel-dist');
    if (distEl) distEl.textContent = data.dist;

    const intelEl = document.getElementById('panel-intel');
    if (intelEl) intelEl.textContent = data.intel;

    const bambooPanel = document.getElementById('bamboo-scroll-panel');
    if (bambooPanel) bambooPanel.classList.remove('collapsed');
  }
}
