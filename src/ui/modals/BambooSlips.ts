/**
 * BambooSlips.ts — Trúc Giản Quân Cơ Khẩn Báo
 * Trấn Quốc Phò Mã Gia (镇国驸马爷)
 * 
 * THIẾT KẾ DIEGETIC:
 * - Dưới dạng những thanh tre đan dây da mở trượt theo trục dọc
 * - Hiển thị nhiệm vụ chiến dịch, tình báo quân cơ và phần thưởng
 */

export class BambooSlips {
  private container: HTMLElement;

  constructor(containerId: string = 'bamboo-slips-modal') {
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement('div');
      el.id = containerId;
      el.className = 'bamboo-slips-overlay hidden';
      document.body.appendChild(el);
    }
    this.container = el;
    this.renderBase();
    this.bindEvents();
  }

  private renderBase(): void {
    this.container.innerHTML = `
      <div class="bamboo-slips-frame">
        <div class="slips-header">
          <span class="slips-seal-stamp">密</span>
          <h3 class="slips-title">QUÂN CƠ MẬT CHỈ • THANH CHÂU CHIẾN DỊCH</h3>
          <button class="slips-close-btn" id="btn-close-slips"><span class="close-seal-char">卷</span> Thu Trúc Giản</button>
        </div>

        <div class="bamboo-slats-container">
          <div class="bamboo-slat">
            <span class="slat-index">壹</span>
            <div class="slat-content">
              <strong>Mục Tiêu Chiến Lược:</strong> Trấn thủ Tường Thành Thanh Châu chống trả 3 đợt công thành của Tiên Phong Địch Hỏa (Nam Ly).
            </div>
          </div>
          <div class="bamboo-slat">
            <span class="slat-index">贰</span>
            <div class="slat-content">
              <strong>Tình Báo Địch Tình:</strong> Địch Hỏa mang 250 HP, trang bị Hỏa Tiễn và Thang Mây. Cần ưu tiên bố trí Cung Thủ phòng thủ Tả Dực.
            </div>
          </div>
          <div class="bamboo-slat">
            <span class="slat-index">叁</span>
            <div class="slat-content">
              <strong>Quân Lương & Viện Binh:</strong> Đã phân phối 10.000 Thạch Lương và 1 Thần Lệnh Bái Tướng. Nếu thắng lợi sẽ phá giải nghi kỵ của Vũ Hoàng.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container || (e.target as HTMLElement).id === 'btn-close-slips') {
        this.close();
      }
    });
  }

  public open(): void {
    this.container.classList.remove('hidden');
  }

  public close(): void {
    this.container.classList.add('hidden');
  }
}
