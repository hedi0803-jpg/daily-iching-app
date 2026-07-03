const STORAGE = {
  daily: "daily-iching.daily",
  history: "daily-iching.history",
  favorites: "daily-iching.favorites",
  notes: "daily-iching.notes",
  settings: "daily-iching.settings"
};

const trigramByElement = {
  天: { name: "乾", glyph: "☰", virtue: "健", line: [1, 1, 1] },
  地: { name: "坤", glyph: "☷", virtue: "顺", line: [0, 0, 0] },
  雷: { name: "震", glyph: "☳", virtue: "动", line: [1, 0, 0] },
  风: { name: "巽", glyph: "☴", virtue: "入", line: [0, 1, 1] },
  水: { name: "坎", glyph: "☵", virtue: "险", line: [0, 1, 0] },
  火: { name: "离", glyph: "☲", virtue: "明", line: [1, 0, 1] },
  山: { name: "艮", glyph: "☶", virtue: "止", line: [0, 0, 1] },
  泽: { name: "兑", glyph: "☱", virtue: "悦", line: [1, 1, 0] }
};

const baseHexagrams = [
  [1, "乾", "乾为天", "天", "天", "健"],
  [2, "坤", "坤为地", "地", "地", "顺"],
  [3, "屯", "水雷屯", "水", "雷", "始"],
  [4, "蒙", "山水蒙", "山", "水", "启"],
  [5, "需", "水天需", "水", "天", "待"],
  [6, "讼", "天水讼", "天", "水", "辨"],
  [7, "师", "地水师", "地", "水", "众"],
  [8, "比", "水地比", "水", "地", "亲"],
  [9, "小畜", "风天小畜", "风", "天", "蓄"],
  [10, "履", "天泽履", "天", "泽", "礼"],
  [11, "泰", "地天泰", "地", "天", "通"],
  [12, "否", "天地否", "天", "地", "守"],
  [13, "同人", "天火同人", "天", "火", "同"],
  [14, "大有", "火天大有", "火", "天", "盛"],
  [15, "谦", "地山谦", "地", "山", "谦"],
  [16, "豫", "雷地豫", "雷", "地", "乐"],
  [17, "随", "泽雷随", "泽", "雷", "从"],
  [18, "蛊", "山风蛊", "山", "风", "治"],
  [19, "临", "地泽临", "地", "泽", "临"],
  [20, "观", "风地观", "风", "地", "观"],
  [21, "噬嗑", "火雷噬嗑", "火", "雷", "断"],
  [22, "贲", "山火贲", "山", "火", "饰"],
  [23, "剥", "山地剥", "山", "地", "剥"],
  [24, "复", "地雷复", "地", "雷", "复"],
  [25, "无妄", "天雷无妄", "天", "雷", "正"],
  [26, "大畜", "山天大畜", "山", "天", "蓄"],
  [27, "颐", "山雷颐", "山", "雷", "养"],
  [28, "大过", "泽风大过", "泽", "风", "承"],
  [29, "坎", "坎为水", "水", "水", "险"],
  [30, "离", "离为火", "火", "火", "明"],
  [31, "咸", "泽山咸", "泽", "山", "感"],
  [32, "恒", "雷风恒", "雷", "风", "恒"],
  [33, "遁", "天山遁", "天", "山", "退"],
  [34, "大壮", "雷天大壮", "雷", "天", "壮"],
  [35, "晋", "火地晋", "火", "地", "进"],
  [36, "明夷", "地火明夷", "地", "火", "韬"],
  [37, "家人", "风火家人", "风", "火", "家"],
  [38, "睽", "火泽睽", "火", "泽", "异"],
  [39, "蹇", "水山蹇", "水", "山", "难"],
  [40, "解", "雷水解", "雷", "水", "解"],
  [41, "损", "山泽损", "山", "泽", "损"],
  [42, "益", "风雷益", "风", "雷", "益"],
  [43, "夬", "泽天夬", "泽", "天", "决"],
  [44, "姤", "天风姤", "天", "风", "遇"],
  [45, "萃", "泽地萃", "泽", "地", "聚"],
  [46, "升", "地风升", "地", "风", "升"],
  [47, "困", "泽水困", "泽", "水", "困"],
  [48, "井", "水风井", "水", "风", "养"],
  [49, "革", "泽火革", "泽", "火", "革"],
  [50, "鼎", "火风鼎", "火", "风", "定"],
  [51, "震", "震为雷", "雷", "雷", "动"],
  [52, "艮", "艮为山", "山", "山", "止"],
  [53, "渐", "风山渐", "风", "山", "渐"],
  [54, "归妹", "雷泽归妹", "雷", "泽", "归"],
  [55, "丰", "雷火丰", "雷", "火", "丰"],
  [56, "旅", "火山旅", "火", "山", "旅"],
  [57, "巽", "巽为风", "风", "风", "入"],
  [58, "兑", "兑为泽", "泽", "泽", "悦"],
  [59, "涣", "风水涣", "风", "水", "散"],
  [60, "节", "水泽节", "水", "泽", "节"],
  [61, "中孚", "风泽中孚", "风", "泽", "信"],
  [62, "小过", "雷山小过", "雷", "山", "慎"],
  [63, "既济", "水火既济", "水", "火", "济"],
  [64, "未济", "火水未济", "火", "水", "未"]
];

const guaCi = [
  "元亨利贞。",
  "元亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。",
  "元亨利贞，勿用有攸往，利建侯。",
  "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
  "有孚，光亨，贞吉。利涉大川。",
  "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
  "贞，丈人吉，无咎。",
  "吉。原筮，元永贞，无咎。不宁方来，后夫凶。",
  "亨。密云不雨，自我西郊。",
  "履虎尾，不咥人，亨。",
  "小往大来，吉亨。",
  "否之匪人，不利君子贞，大往小来。",
  "同人于野，亨。利涉大川，利君子贞。",
  "元亨。",
  "亨，君子有终。",
  "利建侯行师。",
  "元亨利贞，无咎。",
  "元亨，利涉大川。先甲三日，后甲三日。",
  "元亨利贞。至于八月有凶。",
  "盥而不荐，有孚颙若。",
  "亨。利用狱。",
  "亨。小利有攸往。",
  "不利有攸往。",
  "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。",
  "元亨利贞。其匪正有眚，不利有攸往。",
  "利贞。不家食吉，利涉大川。",
  "贞吉。观颐，自求口实。",
  "栋桡，利有攸往，亨。",
  "习坎，有孚，维心亨，行有尚。",
  "利贞，亨。畜牝牛吉。",
  "亨，利贞，取女吉。",
  "亨，无咎，利贞，利有攸往。",
  "亨，小利贞。",
  "利贞。",
  "康侯用锡马蕃庶，昼日三接。",
  "利艰贞。",
  "利女贞。",
  "小事吉。",
  "利西南，不利东北；利见大人，贞吉。",
  "利西南，无所往，其来复吉。有攸往，夙吉。",
  "有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。",
  "利有攸往，利涉大川。",
  "扬于王庭，孚号有厉，告自邑，不利即戎，利有攸往。",
  "女壮，勿用取女。",
  "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。",
  "元亨，用见大人，勿恤，南征吉。",
  "亨，贞，大人吉，无咎。有言不信。",
  "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。",
  "巳日乃孚，元亨利贞，悔亡。",
  "元吉，亨。",
  "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。",
  "艮其背，不获其身，行其庭，不见其人，无咎。",
  "女归吉，利贞。",
  "征凶，无攸利。",
  "亨，王假之，勿忧，宜日中。",
  "小亨，旅贞吉。",
  "小亨，利有攸往，利见大人。",
  "亨，利贞。",
  "亨。王假有庙，利涉大川，利贞。",
  "亨。苦节不可贞。",
  "豚鱼吉，利涉大川，利贞。",
  "亨，利贞。可小事，不可大事。飞鸟遗之音，不宜上，宜下，大吉。",
  "亨小，利贞。初吉终乱。",
  "亨。小狐汔济，濡其尾，无攸利。"
];

const xiangCi = [
  "天行健，君子以自强不息。",
  "地势坤，君子以厚德载物。",
  "云雷屯，君子以经纶。",
  "山下出泉，蒙；君子以果行育德。",
  "云上于天，需；君子以饮食宴乐。",
  "天与水违行，讼；君子以作事谋始。",
  "地中有水，师；君子以容民畜众。",
  "地上有水，比；先王以建万国，亲诸侯。",
  "风行天上，小畜；君子以懿文德。",
  "上天下泽，履；君子以辨上下，定民志。",
  "天地交，泰；后以财成天地之道，辅相天地之宜，以左右民。",
  "天地不交，否；君子以俭德辟难，不可荣以禄。",
  "天与火，同人；君子以类族辨物。",
  "火在天上，大有；君子以遏恶扬善，顺天休命。",
  "地中有山，谦；君子以裒多益寡，称物平施。",
  "雷出地奋，豫；先王以作乐崇德，殷荐之上帝，以配祖考。",
  "泽中有雷，随；君子以向晦入宴息。",
  "山下有风，蛊；君子以振民育德。",
  "泽上有地，临；君子以教思无穷，容保民无疆。",
  "风行地上，观；先王以省方观民设教。",
  "雷电噬嗑；先王以明罚敕法。",
  "山下有火，贲；君子以明庶政，无敢折狱。",
  "山附于地，剥；上以厚下安宅。",
  "雷在地中，复；先王以至日闭关，商旅不行，后不省方。",
  "天下雷行，物与无妄；先王以茂对时育万物。",
  "天在山中，大畜；君子以多识前言往行，以畜其德。",
  "山下有雷，颐；君子以慎言语，节饮食。",
  "泽灭木，大过；君子以独立不惧，遁世无闷。",
  "水洊至，习坎；君子以常德行，习教事。",
  "明两作，离；大人以继明照于四方。",
  "山上有泽，咸；君子以虚受人。",
  "雷风，恒；君子以立不易方。",
  "天下有山，遁；君子以远小人，不恶而严。",
  "雷在天上，大壮；君子以非礼弗履。",
  "明出地上，晋；君子以自昭明德。",
  "明入地中，明夷；君子以莅众，用晦而明。",
  "风自火出，家人；君子以言有物而行有恒。",
  "上火下泽，睽；君子以同而异。",
  "山上有水，蹇；君子以反身修德。",
  "雷雨作，解；君子以赦过宥罪。",
  "山下有泽，损；君子以惩忿窒欲。",
  "风雷，益；君子以见善则迁，有过则改。",
  "泽上于天，夬；君子以施禄及下，居德则忌。",
  "天下有风，姤；后以施命诰四方。",
  "泽上于地，萃；君子以除戎器，戒不虞。",
  "地中生木，升；君子以顺德，积小以高大。",
  "泽无水，困；君子以致命遂志。",
  "木上有水，井；君子以劳民劝相。",
  "泽中有火，革；君子以治历明时。",
  "木上有火，鼎；君子以正位凝命。",
  "洊雷，震；君子以恐惧修省。",
  "兼山，艮；君子以思不出其位。",
  "山上有木，渐；君子以居贤德善俗。",
  "泽上有雷，归妹；君子以永终知敝。",
  "雷电皆至，丰；君子以折狱致刑。",
  "山上有火，旅；君子以明慎用刑，而不留狱。",
  "随风，巽；君子以申命行事。",
  "丽泽，兑；君子以朋友讲习。",
  "风行水上，涣；先王以享于帝立庙。",
  "泽上有水，节；君子以制数度，议德行。",
  "泽上有风，中孚；君子以议狱缓死。",
  "山上有雷，小过；君子以行过乎恭，丧过乎哀，用过乎俭。",
  "水在火上，既济；君子以思患而预防之。",
  "火在水上，未济；君子以慎辨物居方。"
];

const yaoSamples = {
  1: [
    ["初九", "潜龙勿用。"],
    ["九二", "见龙在田，利见大人。"],
    ["九三", "君子终日乾乾，夕惕若，厉无咎。"],
    ["九四", "或跃在渊，无咎。"],
    ["九五", "飞龙在天，利见大人。"],
    ["上九", "亢龙有悔。"]
  ],
  2: [
    ["初六", "履霜，坚冰至。"],
    ["六二", "直方大，不习无不利。"],
    ["六三", "含章可贞，或从王事，无成有终。"],
    ["六四", "括囊，无咎无誉。"],
    ["六五", "黄裳，元吉。"],
    ["上六", "龙战于野，其血玄黄。"]
  ],
  3: [
    ["初九", "磐桓，利居贞，利建侯。"],
    ["六二", "屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。"],
    ["六三", "即鹿无虞，惟入于林中，君子几不如舍，往吝。"],
    ["六四", "乘马班如，求婚媾，往吉，无不利。"],
    ["九五", "屯其膏，小贞吉，大贞凶。"],
    ["上六", "乘马班如，泣血涟如。"]
  ]
};

const zengScenarios = {
  1: "自强开创：能量充足时，先校正方向，再让行动持续。",
  2: "承载成事：不急着抢先，用柔顺与稳定承接局面。",
  3: "草创维艰：新局初起，混乱本身就是成长的一部分。",
  4: "启蒙求学：先承认未知，再建立可以反复验证的判断。",
  5: "等待时机：真正的等待不是停滞，而是蓄养信心与条件。",
  6: "争讼分辨：矛盾出现时，先回到事实与边界。",
  7: "组织成师：众人同行，需要纪律，也需要可信的核心。",
  8: "亲比结盟：靠近同道之前，先看彼此是否真诚相应。"
};

const hexagrams = baseHexagrams.map(([id, name, fullName, upperKey, lowerKey, virtue]) => {
  const upper = trigramByElement[upperKey];
  const lower = trigramByElement[lowerKey];
  return {
    id,
    name,
    fullName,
    upperKey,
    lowerKey,
    upperTrigram: upper.name,
    lowerTrigram: lower.name,
    upperGlyph: upper.glyph,
    lowerGlyph: lower.glyph,
    virtue,
    unicode: String.fromCodePoint(0x4dbf + id),
    lines: [...upper.line, ...lower.line],
    original: {
      guaCi: guaCi[id - 1],
      tuanCi: id === 1 ? "大哉乾元，万物资始，乃统天。" : "彖辞长文留待内容库校对录入，本原型保留公版文本结构。",
      xiangCi: xiangCi[id - 1],
      yaoCis: yaoSamples[id] || []
    },
    gaodao: makeGaodao(id, name, virtue),
    zengShiqiang: makeZeng(id, name, fullName, virtue)
  };
});

const state = {
  view: "today",
  activeTab: "original",
  activeId: 1,
  search: "",
  modal: null,
  toast: "",
  settings: { dark: false, scale: 1 }
};

const app = document.querySelector("#app");

init();

function init() {
  state.settings = { ...state.settings, ...readJson(STORAGE.settings, {}) };
  document.body.classList.toggle("dark", state.settings.dark);
  document.documentElement.style.setProperty("--reader-scale", state.settings.scale);
  const daily = ensureTodayHexagram();
  state.activeId = daily.id;
  render();
  registerServiceWorker();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function ensureTodayHexagram() {
  const today = todayKey();
  let daily = readJson(STORAGE.daily, null);
  if (!daily || daily.date !== today) {
    const id = pickDailyId();
    daily = { date: today, id };
    writeJson(STORAGE.daily, daily);
    upsertHistory(today, id);
  }
  return daily;
}

function pickDailyId() {
  const history = readJson(STORAGE.history, []);
  const recent = new Set(history.slice(0, 7).map((item) => item.id));
  const pool = hexagrams.filter((hex) => !recent.has(hex.id));
  const candidates = pool.length ? pool : hexagrams;
  return candidates[Math.floor(Math.random() * candidates.length)].id;
}

function upsertHistory(date, id) {
  const history = readJson(STORAGE.history, []);
  const next = [{ date, id }, ...history.filter((item) => item.date !== date)].slice(0, 120);
  writeJson(STORAGE.history, next);
}

function render() {
  const hex = getHex(state.activeId);
  app.innerHTML = `
    <main class="stage">
      <section class="phone" aria-label="每日一卦主屏">
        <div class="phone-inner">
          ${renderTopbar()}
          ${renderHexStrip(hex)}
          ${renderHero(hex)}
          ${renderTabs()}
          ${renderReader(hex)}
          ${renderActionBar(hex)}
          ${renderBottomNav()}
        </div>
      </section>
      ${renderPanel()}
    </main>
    ${renderModal()}
    ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
  `;
  bindEvents();
}

function renderTopbar() {
  const date = new Date();
  return `
    <div class="topbar">
      <div>
        <p class="date-main">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日</p>
        <div class="date-sub">${formatGanzhiHint(date)}</div>
      </div>
      <div class="seal">每日<br />一卦</div>
    </div>
  `;
}

function renderHexStrip(activeHex) {
  const center = activeHex.id;
  const ids = [-3, -2, -1, 0, 1, 2, 3].map((offset) => wrapId(center + offset));
  return `
    <div class="hex-strip">
      <button class="icon-button" data-action="prev-hex" title="上一卦" aria-label="上一卦">${icon("chevron-left")}</button>
      <div class="strip-scroller">
        ${ids
          .map((id) => {
            const hex = getHex(id);
            return `
              <button class="strip-item ${id === activeHex.id ? "active" : ""}" data-select="${id}" title="${hex.fullName}">
                <span class="mini-symbol">${hex.unicode}</span>
                <span class="mini-name">${hex.name}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <button class="icon-button" data-action="next-hex" title="下一卦" aria-label="下一卦">${icon("chevron-right")}</button>
    </div>
  `;
}

function renderHero(hex) {
  return `
    <section class="hero">
      <button class="hero-symbol" data-action="zoom" aria-label="放大卦画" title="放大卦画">
        ${renderLines(hex.lines)}
      </button>
      <div class="hero-copy">
        <div class="hex-id">第${hex.id}卦 · ${hex.upperGlyph}${hex.lowerGlyph} ${hex.upperTrigram}上${hex.lowerTrigram}下</div>
        <div class="hex-name-row">
          <div class="hex-name">${hex.name}</div>
          <div class="trigram-pill">${hex.upperTrigram}上<br />${hex.lowerTrigram}下</div>
        </div>
        <div class="full-name">${hex.fullName}</div>
        <div class="virtue-line">
          <span class="virtue-mark">${hex.virtue}</span>
          <span>${makeVirtueLine(hex)}</span>
        </div>
      </div>
    </section>
  `;
}

function renderLines(lines) {
  return `<span class="hex-lines">${lines
    .map((value) => `<span class="hex-line ${value ? "" : "broken"}"></span>`)
    .join("")}</span>`;
}

function renderTabs() {
  const tabs = [
    ["original", "原文"],
    ["gaodao", "高岛"],
    ["wisdom", "智慧"]
  ];
  return `<nav class="tabs" aria-label="三重视角">${tabs
    .map(([key, label]) => `<button class="tab ${state.activeTab === key ? "active" : ""}" data-tab="${key}">${label}</button>`)
    .join("")}</nav>`;
}

function renderReader(hex) {
  if (state.activeTab === "gaodao") {
    return `
      <article class="reader">
        <h2>占断式参考</h2>
        <div class="ornament" aria-hidden="true"></div>
        <div class="reader-text">
          <p>${hex.gaodao.interpretation}</p>
          <div class="topic-grid">
            ${Object.entries(hex.gaodao.divinations)
              .map(([topic, text]) => `<div class="topic-row"><div class="topic-name">${topic}</div><div>${text}</div></div>`)
              .join("")}
          </div>
          <div class="quote-source">— 依《高岛易断》占题结构原创概括</div>
        </div>
      </article>
    `;
  }

  if (state.activeTab === "wisdom") {
    return `
      <article class="reader">
        <h2>${hex.zengShiqiang.scenarioTitle}</h2>
        <div class="ornament" aria-hidden="true"></div>
        <div class="reader-text">
          <p>${hex.zengShiqiang.scenario}</p>
          <p>${hex.zengShiqiang.wisdom}</p>
          <p>${hex.zengShiqiang.application}</p>
          <div class="quote-source">— 现代人生情境原创解读</div>
        </div>
      </article>
    `;
  }

  const yaoList = hex.original.yaoCis.length
    ? `<div class="yao-list">${hex.original.yaoCis
        .map(([position, text]) => `<div class="yao-row"><div class="yao-pos">${position}</div><div>${text}</div></div>`)
        .join("")}</div>`
    : `<div class="yao-list"><div class="yao-row"><div class="yao-pos">爻辞</div><div>完整六爻文本留待内容库校对录入，本原型先呈现卦辞与象辞。</div></div></div>`;

  return `
    <article class="reader">
      <h2>${hex.original.guaCi}</h2>
      <div class="ornament" aria-hidden="true"></div>
      <div class="reader-text">
        <p>${hex.name}，${hex.virtue}也。${hex.original.xiangCi}</p>
        <p>${hex.original.tuanCi}</p>
        ${yaoList}
        <div class="quote-source">— 《周易》${hex.name}卦</div>
      </div>
    </article>
  `;
}

function renderActionBar(hex) {
  const favorites = readJson(STORAGE.favorites, []);
  const notes = readJson(STORAGE.notes, {});
  const daily = readJson(STORAGE.daily, { date: todayKey() });
  const fav = favorites.includes(hex.id);
  const hasNote = Boolean(notes[daily.date]);
  return `
    <div class="action-bar">
      <button class="bar-button ${fav ? "active" : ""}" data-action="favorite" title="收藏" aria-label="收藏">${icon("star")}<span>收藏</span></button>
      <button class="bar-button ${hasNote ? "note-active" : ""}" data-action="note" title="笔记" aria-label="笔记">${icon("pencil")}<span>笔记</span></button>
      <button class="bar-button" data-action="share" title="分享" aria-label="分享">${icon("share")}<span>分享</span></button>
      <button class="bar-button" data-action="history" title="历史" aria-label="历史">${icon("clock")}<span>历史</span></button>
    </div>
  `;
}

function renderBottomNav() {
  const items = [
    ["today", "sun", "今日"],
    ["list", "hex", "卦象"],
    ["history", "clock", "历史"],
    ["mine", "user", "我的"]
  ];
  return `
    <nav class="bottom-nav" aria-label="主导航">
      ${items
        .map(([view, iconName, label]) => `<button class="nav-button ${state.view === view ? "active" : ""}" data-view="${view}">${icon(iconName)}<span>${label}</span></button>`)
        .join("")}
    </nav>
  `;
}

function renderPanel() {
  if (state.view === "list") return renderListPanel();
  if (state.view === "history") return renderHistoryPanel();
  if (state.view === "mine") return renderMinePanel();
  return renderTodayPanel();
}

function renderTodayPanel() {
  const daily = readJson(STORAGE.daily, { date: todayKey(), id: state.activeId });
  const todayHex = getHex(daily.id);
  return `
    <aside class="panel">
      <div class="panel-inner">
        <div class="panel-header">
          <div>
            <h1>今日卦象</h1>
            <p class="panel-desc">同日重复打开保持一致，重新抽卦会覆盖今天记录。</p>
          </div>
          <button class="primary-button" data-action="recast">${icon("refresh")}重新抽卦</button>
        </div>
        <div class="mine-grid">
          <div class="setting-block">
            <h3>${todayHex.fullName}</h3>
            <p>${todayHex.original.xiangCi}</p>
          </div>
          <div class="setting-block">
            <h3>内容口径</h3>
            <p>《周易》卦辞与象辞为公版文本；“高岛”“智慧”栏为结构化原创概括，正式上线前需替换为已授权或自研内容。</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function renderListPanel() {
  const query = state.search.trim();
  const list = hexagrams.filter((hex) => !query || `${hex.name}${hex.fullName}${hex.upperTrigram}${hex.lowerTrigram}`.includes(query));
  return `
    <aside class="panel">
      <div class="panel-inner">
        <div class="panel-header">
          <div>
            <h1>全部卦象</h1>
            <p class="panel-desc">按周易通行卦序浏览六十四卦。</p>
          </div>
        </div>
        <div class="search-row">
          <input class="search-input" value="${escapeAttribute(state.search)}" placeholder="搜索卦名、全称或上下卦" aria-label="搜索卦象" />
        </div>
        <div class="list-grid">
          ${list
            .map(
              (hex) => `
                <button class="hex-card ${hex.id === state.activeId ? "active" : ""}" data-select="${hex.id}">
                  <span class="card-symbol">${hex.unicode}</span>
                  <span>
                    <span class="card-title">第${hex.id}卦 · ${hex.name}</span>
                    <span class="card-meta">${hex.fullName} · ${hex.virtue}</span>
                  </span>
                  <span aria-hidden="true">${icon("chevron-right")}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </aside>
  `;
}

function renderHistoryPanel() {
  const history = readJson(STORAGE.history, []);
  const notes = readJson(STORAGE.notes, {});
  return `
    <aside class="panel">
      <div class="panel-inner">
        <div class="panel-header">
          <div>
            <h1>历史记录</h1>
            <p class="panel-desc">每日抽卦会自动进入时间线。</p>
          </div>
        </div>
        ${
          history.length
            ? `<div class="history-list">${history
                .map((item) => {
                  const hex = getHex(item.id);
                  return `
                    <div class="history-row">
                      <div class="history-date">${item.date.slice(5)}</div>
                      <div>
                        <div class="history-title">${hex.unicode} 第${hex.id}卦 · ${hex.fullName}</div>
                        <div class="history-note">${notes[item.date] ? notes[item.date].slice(0, 42) : hex.original.guaCi}</div>
                      </div>
                      <button class="icon-button" data-select="${hex.id}" title="查看" aria-label="查看">${icon("chevron-right")}</button>
                    </div>
                  `;
                })
                .join("")}</div>`
            : `<div class="empty">暂无历史记录</div>`
        }
      </div>
    </aside>
  `;
}

function renderMinePanel() {
  const favorites = readJson(STORAGE.favorites, []);
  return `
    <aside class="panel">
      <div class="panel-inner">
        <div class="panel-header">
          <div>
            <h1>我的</h1>
            <p class="panel-desc">收藏、阅读偏好与内容说明。</p>
          </div>
        </div>
        <div class="mine-grid">
          <div class="setting-block">
            <h3>收藏</h3>
            ${
              favorites.length
                ? `<div class="history-list">${favorites
                    .map((id) => {
                      const hex = getHex(id);
                      return `<button class="hex-card" data-select="${id}"><span class="card-symbol">${hex.unicode}</span><span><span class="card-title">${hex.fullName}</span><span class="card-meta">第${hex.id}卦 · ${hex.virtue}</span></span></button>`;
                    })
                    .join("")}</div>`
                : `<p>尚未收藏卦象。</p>`
            }
          </div>
          <div class="setting-block">
            <h3>阅读</h3>
            <div class="switch-row">
              <span class="small-copy">字号</span>
              <input type="range" min="0.9" max="1.18" step="0.02" value="${state.settings.scale}" data-setting="scale" aria-label="字号" />
            </div>
            <div class="switch-row">
              <span class="small-copy">深色</span>
              <button class="switch ${state.settings.dark ? "on" : ""}" data-setting="dark" aria-label="深色模式"><span></span></button>
            </div>
          </div>
          <div class="setting-block">
            <h3>版权</h3>
            <p>正式产品需为《高岛易断》译本与《易经的智慧》取得授权，或改为原创课程式解读。本原型不承载受保护长文。</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function renderModal() {
  if (!state.modal) return "";
  const hex = getHex(state.activeId);
  if (state.modal === "note") {
    const daily = readJson(STORAGE.daily, { date: todayKey() });
    const notes = readJson(STORAGE.notes, {});
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal" role="dialog" aria-modal="true" aria-label="今日笔记">
          <div class="modal-body" data-stop>
            <h2 class="modal-title">今日笔记</h2>
            <textarea class="note-area" aria-label="今日笔记">${escapeHtml(notes[daily.date] || "")}</textarea>
            <div class="modal-actions">
              <button class="ghost-button" data-action="close-modal">取消</button>
              <button class="primary-button" data-action="save-note">${icon("save")}保存</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
  if (state.modal === "share") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal" role="dialog" aria-modal="true" aria-label="分享卡片">
          <div class="modal-body" data-stop>
            <h2 class="modal-title">分享卡片</h2>
            <div class="share-card">
              <div class="share-top">
                <div>
                  <div class="share-name">${hex.name} · ${hex.fullName}</div>
                  <div class="card-meta">第${hex.id}卦 · ${todayKey()}</div>
                </div>
                <div class="share-symbol">${hex.unicode}</div>
              </div>
              <div class="share-line">${hex.original.xiangCi}</div>
              <div class="share-line">今日关键词：${hex.virtue}</div>
            </div>
            <div class="modal-actions">
              <button class="ghost-button" data-action="close-modal">关闭</button>
              <button class="primary-button" data-action="copy-share">${icon("copy")}复制文案</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
  if (state.modal === "zoom") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal" role="dialog" aria-modal="true" aria-label="卦画">
          <div class="modal-body" data-stop>
            <h2 class="modal-title">${hex.fullName}</h2>
            <div class="share-card">
              <div style="transform: scale(1.35); transform-origin: center; padding: 28px 44px;">${renderLines(hex.lines)}</div>
              <div class="share-line">${hex.upperGlyph}${hex.lowerGlyph} ${hex.upperTrigram}上${hex.lowerTrigram}下</div>
            </div>
            <div class="modal-actions">
              <button class="primary-button" data-action="close-modal">收起</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
  if (state.modal === "recast") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal" role="dialog" aria-modal="true" aria-label="重新抽卦确认">
          <div class="modal-body" data-stop>
            <h2 class="modal-title">重新抽卦</h2>
            <p class="small-copy">这会覆盖今天的卦象记录，并写入新的历史条目。</p>
            <div class="modal-actions">
              <button class="ghost-button" data-action="close-modal">取消</button>
              <button class="primary-button" data-action="confirm-recast">${icon("refresh")}确认</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
  return "";
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      state.view = view;
      if (view === "today") state.activeId = readJson(STORAGE.daily, { id: state.activeId }).id;
      render();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeId = Number(button.dataset.select);
      if (state.view !== "list" && state.view !== "mine") state.view = "today";
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => handleAction(button.dataset.action, event));
  });

  document.querySelectorAll("[data-stop]").forEach((node) => {
    node.addEventListener("click", (event) => event.stopPropagation());
  });

  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.search = event.target.value;
      render();
    });
  }

  document.querySelectorAll("[data-setting]").forEach((control) => {
    control.addEventListener("input", (event) => {
      if (event.currentTarget.dataset.setting === "scale") {
        state.settings.scale = Number(event.currentTarget.value);
        persistSettings();
      }
    });
    control.addEventListener("click", (event) => {
      if (event.currentTarget.dataset.setting === "dark") {
        state.settings.dark = !state.settings.dark;
        persistSettings();
      }
    });
  });
}

function handleAction(action, event) {
  if (action === "prev-hex") state.activeId = wrapId(state.activeId - 1);
  if (action === "next-hex") state.activeId = wrapId(state.activeId + 1);
  if (action === "favorite") toggleFavorite(state.activeId);
  if (action === "note") state.modal = "note";
  if (action === "share") state.modal = "share";
  if (action === "history") state.view = "history";
  if (action === "zoom") state.modal = "zoom";
  if (action === "recast") state.modal = "recast";
  if (action === "close-modal") state.modal = null;
  if (action === "save-note") saveNote();
  if (action === "copy-share") copyShare();
  if (action === "confirm-recast") recastToday();
  if (event) event.stopPropagation();
  render();
}

function toggleFavorite(id) {
  const favorites = readJson(STORAGE.favorites, []);
  const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [id, ...favorites];
  writeJson(STORAGE.favorites, next);
  showToast(next.includes(id) ? "已收藏" : "已取消收藏");
}

function saveNote() {
  const daily = readJson(STORAGE.daily, { date: todayKey() });
  const notes = readJson(STORAGE.notes, {});
  const value = document.querySelector(".note-area")?.value.trim() || "";
  if (value) notes[daily.date] = value;
  else delete notes[daily.date];
  writeJson(STORAGE.notes, notes);
  state.modal = null;
  showToast("笔记已保存");
}

function recastToday() {
  const today = todayKey();
  let id = pickDailyId();
  if (id === readJson(STORAGE.daily, {}).id) id = wrapId(id + 1);
  writeJson(STORAGE.daily, { date: today, id });
  upsertHistory(today, id);
  state.activeId = id;
  state.modal = null;
  state.view = "today";
  showToast("今日卦象已更新");
}

function copyShare() {
  const hex = getHex(state.activeId);
  const text = `每日一卦：第${hex.id}卦 ${hex.fullName}\n${hex.original.guaCi}\n${hex.original.xiangCi}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast("分享文案已复制")).catch(() => showToast(text));
  } else {
    showToast(text);
  }
  state.modal = null;
}

function persistSettings() {
  writeJson(STORAGE.settings, state.settings);
  document.body.classList.toggle("dark", state.settings.dark);
  document.documentElement.style.setProperty("--reader-scale", state.settings.scale);
  render();
}

function makeGaodao(id, name, virtue) {
  return {
    interpretation: `${name}卦以“${virtue}”为当下切入点。占断时先看时位是否相应，再看进退是否过度；宜把结果当作反思线索，不作直接决策凭据。`,
    divinations: {
      时运: `气机重在${virtue}，宜守正审势，急进则易失衡。`,
      营商: "先理清资源、契约与节奏，适合稳步推进，不宜只凭一时热度。",
      疾病: "以调养和复查为先；身体事项应遵从专业医疗意见。",
      婚姻: "重在沟通边界与诚意，少作试探，多看长期相处。",
      功名: "宜积累基础、等待窗口，能以小成铺垫大成。"
    },
    examples: id <= 3 ? ["占例文本需使用已授权版本；本原型仅保留入口。"] : []
  };
}

function makeZeng(id, name, fullName, virtue) {
  return {
    scenarioTitle: zengScenarios[id]?.split("：")[0] || `${name}之境`,
    scenario: zengScenarios[id] || `${fullName}提示一种以“${virtue}”为核心的人生情境：先辨清位置，再决定该进、该守、该退还是该化。`,
    wisdom: `核心智慧不是求一个固定答案，而是借${name}卦提醒自己：时、位、德、行四者需要相配。`,
    application: `今天可以把“${virtue}”落到一件小事上：放慢一个判断，补足一个条件，或把话说得更清楚。`,
    quote: "原创概括，正式版可替换为授权摘录。"
  };
}

function makeVirtueLine(hex) {
  if (hex.id === 1) return "天行健，君子以自强不息。";
  if (hex.id === 2) return "地势坤，君子以厚德载物。";
  return `${hex.fullName}，以${hex.virtue}观时。`;
}

function getHex(id) {
  return hexagrams.find((hex) => hex.id === id) || hexagrams[0];
}

function wrapId(id) {
  if (id < 1) return 64;
  if (id > 64) return 1;
  return id;
}

function todayKey() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatGanzhiHint(date) {
  const stems = "甲乙丙丁戊己庚辛壬癸".split("");
  const branches = "子丑寅卯辰巳午未申酉戌亥".split("");
  const dayIndex = Math.floor(date.getTime() / 86400000 + 40) % 60;
  const monthIndex = date.getMonth();
  return `${stems[(date.getFullYear() - 4) % 10]}${branches[(date.getFullYear() - 4) % 12]}年　${stems[(monthIndex + 1) % 10]}${branches[(monthIndex + 2) % 12]}月　${stems[dayIndex % 10]}${branches[dayIndex % 12]}日`;
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function showToast(message) {
  state.toast = message;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function icon(name) {
  const attrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const paths = {
    "chevron-left": '<path d="m15 18-6-6 6-6" />',
    "chevron-right": '<path d="m9 18 6-6-6-6" />',
    star: '<path d="m12 2 3.1 6.5 7.1 1-5.1 5 1.2 7-6.3-3.4-6.3 3.4 1.2-7-5.1-5 7.1-1Z" />',
    pencil: '<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />',
    share: '<path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 14v5h14v-5" />',
    clock: '<circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" />',
    sun: '<path d="M4 17h16" /><path d="M7 17a5 5 0 0 1 10 0" /><path d="M12 5v3" /><path d="m5.6 9.6 2.1 2.1" /><path d="m18.4 9.6-2.1 2.1" />',
    hex: '<path d="M12 3 21 8v8l-9 5-9-5V8Z" /><path d="M8 9h8" /><path d="M7 12h10" /><path d="M8 15h8" />',
    user: '<path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />',
    refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v6h-6" />',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" />',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2" /><rect x="4" y="4" width="11" height="11" rx="2" />'
  };
  return `<svg ${attrs}>${paths[name] || ""}</svg>`;
}
