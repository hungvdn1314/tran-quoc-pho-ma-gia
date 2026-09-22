/**
 * InkEngine.ts — Ink Script Runner & State Machine
 * Dự án: Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * Trình thông dịch kịch bản phân nhánh dựa trên chuẩn cú pháp Ink.
 * Tương thích 100% môi trường trình duyệt Offline (zero-dependencies).
 */

export interface InkChoice {
  text: string;
  targetKnot: string | null;
  mutations: string[];
  tags: string[];
}

export interface InkVariables {
  [key: string]: any;
  gold: number;
  jade: number;
  rations: number;
  suspicion: number;
  has_anh_hon_lenh: boolean;
  system_awakened: boolean;
  poetry_duel_won: boolean;
  imperial_prestige: number;
  chapter: number;
  unlocked_gacha: boolean;
  unlocked_soap: boolean;
  unlocked_map: boolean;
  unlocked_flood: boolean;
  unlocked_granary: boolean;
  unlocked_battle: boolean;
  affinity_trieu_van: number;
  affinity_matac: number;
  affinity_gaoshun: number;
  affinity_gia_hu: number;
  affinity_dieu_thuyen: number;
  met_vu_hoang: boolean;
  met_to_kien_phong: boolean;
  met_ve_ti_vu: boolean;
  met_gia_hu: boolean;
  ch10_method: string;
}

export class InkEngine {
  public knots: Map<string, string[]> = new Map();
  public variables: InkVariables = {
    gold: 0,
    jade: 0,
    rations: 0,
    suspicion: 0,
    has_anh_hon_lenh: false,
    system_awakened: false,
    poetry_duel_won: false,
    imperial_prestige: 0,
    chapter: 1,
    unlocked_gacha: false,
    unlocked_soap: false,
    unlocked_map: false,
    unlocked_flood: false,
    unlocked_granary: false,
    unlocked_battle: false,
    affinity_trieu_van: 0,
    affinity_matac: 0,
    affinity_gaoshun: 0,
    affinity_gia_hu: 0,
    affinity_dieu_thuyen: 0,
    met_vu_hoang: false,
    met_to_kien_phong: false,
    met_ve_ti_vu: false,
    met_gia_hu: false,
    ch10_method: "none"
  };

  public currentKnot: string | null = null;
  public currentText: string[] = [];
  public currentTags: string[] = [];
  public currentChoices: InkChoice[] = [];
  public isStoryEnd: boolean = false;
  public autoDivertTarget: string | null = null;
  public onEffectCallback: ((tag: string) => void) | null = null;

  constructor() {}

  /**
   * Đăng ký callback khi có effect từ kịch bản (rung màn hình, mở khóa tính năng, v.v.)
   */
  public setEffectHandler(fn: (tag: string) => void): void {
    this.onEffectCallback = fn;
  }

  /**
   * Nạp và parse kịch bản văn bản Ink thô
   */
  public loadStoryScript(scriptText: string): void {
    const lines = scriptText.split(/\r?\n/);
    let currentKnotName: string | null = null;
    let currentKnotContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Bỏ qua dòng trống hoặc comment đơn
      if (!line || line.startsWith("//")) continue;

      // Khai báo biến toàn cục: VAR name = val
      if (line.startsWith("VAR ")) {
        const match = line.match(/^VAR\s+([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
        if (match) {
          const varName = match[1];
          let val: any = match[2].trim();
          if (val === "true") val = true;
          else if (val === "false") val = false;
          else if (!isNaN(Number(val))) val = Number(val);
          this.variables[varName] = val;
        }
        continue;
      }

      // Khai báo Knot: === knot_name ===
      const knotMatch = line.match(/^===\s*([a-zA-Z0-9_]+)\s*===$/);
      if (knotMatch) {
        if (currentKnotName) {
          this.knots.set(currentKnotName, currentKnotContent);
        }
        currentKnotName = knotMatch[1];
        currentKnotContent = [];
        continue;
      }

      if (currentKnotName) {
        currentKnotContent.push(line);
      }
    }

    if (currentKnotName) {
      this.knots.set(currentKnotName, currentKnotContent);
    }

    console.log(`[InkEngine] Đã nạp thành công ${this.knots.size} knots kịch bản.`);
  }

  /**
   * Bắt đầu một knot mới
   */
  public start(knotName: string): boolean {
    if (!this.knots.has(knotName)) {
      console.warn(`[InkEngine] Không tìm thấy knot: ${knotName}`);
      return false;
    }

    this.currentKnot = knotName;
    this.executeKnot(knotName);
    return true;
  }

  /**
   * Thực thi nội dung của knot hiện tại
   */
  public executeKnot(knotName: string): void {
    const rawLines = this.knots.get(knotName);
    if (!rawLines) return;

    this.currentText = [];
    this.currentTags = [];
    this.currentChoices = [];
    this.isStoryEnd = false;

    let autoDivert: string | null = null;
    let i = 0;

    while (i < rawLines.length) {
      const line = rawLines[i];

      // 1. Parse Tags (# BACKGROUND: ..., # EFFECT: ..., # ACTORS: ...)
      if (line.startsWith("#")) {
        const tagContent = line.substring(1).trim();
        this.currentTags.push(tagContent);
        this.handleTag(tagContent);
        i++;
        continue;
      }

      // 2. Parse Variable Mutation (~ gold += 100)
      if (line.startsWith("~")) {
        this.evaluateMutation(line.substring(1).trim());
        i++;
        continue;
      }

      // 3. Parse Choices (* [Choice Text] -> target / or block)
      if (line.startsWith("*") || line.startsWith("+")) {
        const choiceMatch = line.match(/^[\*\+]\s*\[(.*?)\]\s*(.*)$/);
        if (choiceMatch) {
          const choiceText = choiceMatch[1];
          const remainder = choiceMatch[2].trim();
          let targetKnot: string | null = null;

          const choiceMutations: string[] = [];
          const choiceTags: string[] = [];

          if (remainder.startsWith("->")) {
            targetKnot = remainder.substring(2).trim();
          } else {
            // Choice có sub-body
            const subBody: string[] = [];
            i++;
            while (
              i < rawLines.length &&
              !rawLines[i].startsWith("*") &&
              !rawLines[i].startsWith("+") &&
              !rawLines[i].startsWith("===")
            ) {
              const subLine = rawLines[i];
              if (subLine.includes("->")) {
                const divMatch = subLine.match(/->\s*([a-zA-Z0-9_]+)/);
                if (divMatch) targetKnot = divMatch[1];
              }
              if (subLine.startsWith("~")) {
                choiceMutations.push(subLine.substring(1).trim());
              }
              if (subLine.startsWith("#")) {
                choiceTags.push(subLine.substring(1).trim());
              }
              subBody.push(subLine);
              i++;
            }
            i--; // Điều chỉnh chỉ số
          }

          this.currentChoices.push({
            text: choiceText,
            targetKnot: targetKnot,
            mutations: choiceMutations,
            tags: choiceTags
          });
        }
        i++;
        continue;
      }

      // 4. Parse Direct Divert (-> knot_name)
      if (line.startsWith("->")) {
        const divertTarget = line.substring(2).trim();
        if (divertTarget === "END") {
          this.isStoryEnd = true;
        } else {
          autoDivert = divertTarget;
        }
        i++;
        continue;
      }

      // 5. Normal narrative line
      this.currentText.push(line);
      i++;
    }

    // Nếu không có lựa chọn và có autoDivert, lưu lại để chuyển tiếp
    this.autoDivertTarget = autoDivert;
  }

  /**
   * Xử lý đột biến biến số
   */
  public evaluateMutation(expr: string): void {
    // Biến thức: gold += 100, gold -= 50, suspicion += 10, flag = true
    const addMatch = expr.match(/^([a-zA-Z0-9_]+)\s*\+=\s*(.+)$/);
    if (addMatch) {
      const v = addMatch[1];
      const val = Number(addMatch[2]);
      if (!isNaN(val)) (this.variables as any)[v] = ((this.variables as any)[v] || 0) + val;
      return;
    }

    const subMatch = expr.match(/^([a-zA-Z0-9_]+)\s*-=\s*(.+)$/);
    if (subMatch) {
      const v = subMatch[1];
      const val = Number(subMatch[2]);
      if (!isNaN(val)) (this.variables as any)[v] = Math.max(0, ((this.variables as any)[v] || 0) - val);
      return;
    }

    const setMatch = expr.match(/^([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
    if (setMatch) {
      const v = setMatch[1];
      let val: any = setMatch[2].trim();
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (!isNaN(Number(val))) val = Number(val);
      (this.variables as any)[v] = val;
      return;
    }
  }

  /**
   * Xử lý các tags đồ họa, âm thanh và hiệu ứng
   */
  public handleTag(tag: string): void {
    if (this.onEffectCallback) {
      this.onEffectCallback(tag);
    }
  }

  /**
   * Người chơi chọn một lựa chọn
   */
  public makeChoice(choiceIndex: number): boolean {
    if (choiceIndex < 0 || choiceIndex >= this.currentChoices.length) {
      console.warn(`[InkEngine] Chỉ số lựa chọn không hợp lệ: ${choiceIndex}`);
      return false;
    }

    const choice = this.currentChoices[choiceIndex];
    if (choice) {
      if (choice.mutations && choice.mutations.length > 0) {
        choice.mutations.forEach(m => this.evaluateMutation(m));
      }
      if (choice.tags && choice.tags.length > 0) {
        choice.tags.forEach(t => this.handleTag(t));
      }
      if (choice.targetKnot) {
        this.start(choice.targetKnot);
        return true;
      }
    }
    return false;
  }

  /**
   * Tiến tới knot tiếp theo nếu có auto divert
   */
  public continueStory(): boolean {
    if (this.autoDivertTarget) {
      const target = this.autoDivertTarget;
      this.autoDivertTarget = null;
      this.start(target);
      return true;
    }
    return false;
  }

  public hasChoices(): boolean {
    return this.currentChoices.length > 0;
  }

  public canAutoContinue(): boolean {
    return !!this.autoDivertTarget && this.currentChoices.length === 0;
  }
}

// Xuất ra window cho tương thích ngược nếu cần
if (typeof window !== "undefined") {
  (window as any).InkEngine = InkEngine;
}
