const ICHING_READINGS = Object.freeze({
  屯: "zhūn", 否: "pǐ", 贲: "bì", 蛊: "gǔ", 噬: "shì", 嗑: "hé",
  颐: "yí", 遁: "dùn", 睽: "kuí", 蹇: "jiǎn", 夬: "guài", 姤: "gòu",
  萃: "cuì", 巽: "xùn", 艮: "gèn", 坎: "kǎn", 兑: "duì", 孚: "fú",
  盥: "guàn", 颙: "yóng", 牝: "pìn", 筮: "shì", 渎: "dú", 裒: "póu",
  眚: "shěng", 簋: "guǐ", 汔: "qì", 濡: "rú", 曳: "yè",
  繘: "yù", 羸: "léi", 虩: "xì", 鬯: "chàng", 坼: "chè", 偕: "xié",
  祐: "yòu", 媾: "gòu", 邅: "zhān", 桎: "zhì", 梏: "gù", 鞶: "pán",
  褫: "chǐ", 缶: "fǒu", 挛: "luán", 眇: "miǎo", 罹: "lí", 戎: "róng",
  曷: "hé", 诰: "gào", 昃: "zè", 洊: "jiàn", 蕃: "fán", 箕: "jī",
  皤: "pó", 戋: "jiān", 翰: "hàn", 帛: "bó", 舆: "yú", 攸: "yōu",
  咎: "jiù", 吝: "lìn", 夙: "sù", 惕: "tì", 逋: "bū", 愠: "yùn"
});

const pronunciationMatcher = new RegExp(`[${Object.keys(ICHING_READINGS).join("")}]`, "u");

function readingFor(char, text, index) {
  if (char === "否") {
    const before = text[index - 1] || "";
    const after = text.slice(index + 1);
    if ((before && "是能可会有要与知".includes(before)) || /^(则|定|认|决)/u.test(after)) return null;
  }
  if (char === "屯" && /^(田|兵|积|粮)/u.test(text.slice(index + 1))) return null;
  return ICHING_READINGS[char] || null;
}

const pronunciationTip = document.createElement("div");
pronunciationTip.className = "pronunciation-tip";
pronunciationTip.id = "pronunciation-tip";
pronunciationTip.setAttribute("role", "status");
pronunciationTip.setAttribute("aria-live", "polite");
pronunciationTip.hidden = true;
let activePronunciation = null;

function closePronunciation() {
  if (activePronunciation) activePronunciation.setAttribute("aria-expanded", "false");
  activePronunciation = null;
  pronunciationTip.hidden = true;
}

function showPronunciation(button) {
  if (activePronunciation === button) {
    closePronunciation();
    return;
  }
  closePronunciation();
  activePronunciation = button;
  button.setAttribute("aria-expanded", "true");
  pronunciationTip.textContent = `${button.textContent} · ${button.dataset.reading}`;
  pronunciationTip.hidden = false;
  const rect = button.getBoundingClientRect();
  const left = rect.left + rect.width / 2 - pronunciationTip.offsetWidth / 2;
  pronunciationTip.style.left = `${Math.min(window.innerWidth - pronunciationTip.offsetWidth - 8, Math.max(8, left))}px`;
  const above = rect.top - pronunciationTip.offsetHeight - 10;
  pronunciationTip.classList.toggle("below", above < 8);
  pronunciationTip.style.top = `${above >= 8 ? above : rect.bottom + 10}px`;
}

function annotatePronunciation(root) {
  closePronunciation();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!pronunciationMatcher.test(node.textContent)) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("button, a, input, textarea, select, svg, .trigram-pill, [aria-hidden='true']")) {
        return NodeFilter.FILTER_REJECT;
      }
      return parent.closest(".hero-copy, .reader, .panel, .share-card, .modal-title")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    let plain = "";
    const original = node.textContent;
    for (let index = 0; index < original.length; index += 1) {
      const char = original[index];
      const reading = readingFor(char, original, index);
      if (!reading) {
        plain += char;
        continue;
      }
      if (plain) fragment.append(document.createTextNode(plain));
      plain = "";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hanzi-reading";
      button.textContent = char;
      button.dataset.reading = reading;
      button.setAttribute("aria-label", `${char}，读作${reading}`);
      button.setAttribute("aria-controls", "pronunciation-tip");
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        showPronunciation(button);
      });
      fragment.append(button);
    }
    if (plain) fragment.append(document.createTextNode(plain));
    node.replaceWith(fragment);
  }
}

function initPronunciation() {
  document.body.append(pronunciationTip);
  document.addEventListener("click", closePronunciation);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePronunciation();
  });
  window.addEventListener("scroll", closePronunciation, { passive: true });
  window.addEventListener("resize", closePronunciation);
}
