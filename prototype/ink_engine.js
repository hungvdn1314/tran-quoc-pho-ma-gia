/**
 * Ink Script Runner & State Machine (InkEngine)
 * Dự án: Trấn Quốc Phò Mã Gia (Prototype V3)
 * Trình thông dịch kịch bản phân nhánh dựa trên chuẩn cú pháp Ink.
 * Tương thích 100% môi trường trình duyệt Offline (zero-dependencies).
 */

class InkEngine {
  constructor() {
    this.knots = new Map();
    this.variables = {
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
      affinity_gaoshun: 0,
      affinity_gia_hu: 0,
      affinity_dieu_thuyen: 0,
      met_vu_hoang: false,
      met_to_kien_phong: false,
      met_ve_ti_vu: false,
      met_gia_hu: false,
      ch10_method: "none"
    };

    this.currentKnot = null;
    this.currentText = [];
    this.currentTags = [];
    this.currentChoices = [];
    this.isStoryEnd = false;
    this.onEffectCallback = null;
  }

  /**
   * Đăng ký callback khi có effect từ kịch bản (rung màn hình, mở khóa tính năng, v.v.)
   */
  setEffectHandler(fn) {
    this.onEffectCallback = fn;
  }

  /**
   * Nạp và parse kịch bản văn bản Ink thô
   */
  loadStoryScript(scriptText) {
    const lines = scriptText.split(/\r?\n/);
    let currentKnotName = null;
    let currentKnotContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Bỏ qua dòng trống hoặc comment đơn
      if (!line || line.startsWith("//")) continue;

      // Khai báo biến toàn cục: VAR name = val
      if (line.startsWith("VAR ")) {
        const match = line.match(/^VAR\s+([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
        if (match) {
          const varName = match[1];
          let val = match[2].trim();
          if (val === "true") val = true;
          else if (val === "false") val = false;
          else if (!isNaN(val)) val = Number(val);
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
  start(knotName) {
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
  executeKnot(knotName) {
    const rawLines = this.knots.get(knotName);
    if (!rawLines) return;

    this.currentText = [];
    this.currentTags = [];
    this.currentChoices = [];
    this.isStoryEnd = false;

    let autoDivert = null;
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
          let remainder = choiceMatch[2].trim();
          let targetKnot = null;

          let choiceMutations = [];
          let choiceTags = [];

          if (remainder.startsWith("->")) {
            targetKnot = remainder.substring(2).trim();
          } else {
            // Choice có sub-body
            let subBody = [];
            i++;
            while (i < rawLines.length && !rawLines[i].startsWith("*") && !rawLines[i].startsWith("+") && !rawLines[i].startsWith("===")) {
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
  evaluateMutation(expr) {
    // Biến thức: gold += 100, gold -= 50, suspicion += 10, flag = true
    const addMatch = expr.match(/^([a-zA-Z0-9_]+)\s*\+=\s*(.+)$/);
    if (addMatch) {
      const v = addMatch[1];
      const val = Number(addMatch[2]);
      if (!isNaN(val)) this.variables[v] = (this.variables[v] || 0) + val;
      return;
    }

    const subMatch = expr.match(/^([a-zA-Z0-9_]+)\s*-=\s*(.+)$/);
    if (subMatch) {
      const v = subMatch[1];
      const val = Number(subMatch[2]);
      if (!isNaN(val)) this.variables[v] = Math.max(0, (this.variables[v] || 0) - val);
      return;
    }

    const setMatch = expr.match(/^([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
    if (setMatch) {
      const v = setMatch[1];
      let val = setMatch[2].trim();
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (!isNaN(val)) val = Number(val);
      this.variables[v] = val;
      return;
    }
  }

  /**
   * Xử lý các tags đồ họa, âm thanh và hiệu ứng
   */
  handleTag(tag) {
    if (this.onEffectCallback) {
      this.onEffectCallback(tag);
    }
  }

  /**
   * Người chơi chọn một lựa chọn
   */
  makeChoice(choiceIndex) {
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
  continueStory() {
    if (this.autoDivertTarget) {
      const target = this.autoDivertTarget;
      this.autoDivertTarget = null;
      this.start(target);
      return true;
    }
    return false;
  }

  hasChoices() {
    return this.currentChoices.length > 0;
  }

  canAutoContinue() {
    return !!this.autoDivertTarget && this.currentChoices.length === 0;
  }
}

// Xuất ra toàn cục
if (typeof window !== "undefined") {
  window.InkEngine = InkEngine;
}
