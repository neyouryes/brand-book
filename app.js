const $ = (s)=>document.querySelector(s);

const stage = $("#stage");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const pageTxt = $("#pageTxt");
const homeBtn = $("#homeBtn");

/**
 * 4 panels (100×150) content
 * 1–2 : spread 1
 * 3–4 : spread 2
 */
const PANELS = [
  {
    label: "Cover",
    no: "PANEL 1",
    title: "T.C.H",
    subtitle: "To. coffee haus",
    body:
`Bean Archive · Blend System

우리는
원두를 판매하는 로스터리가 아니라
선택을 설계하는 로스터리입니다.

불필요한 복잡함을 줄이고
카페 운영에 필요한 기준을 제공합니다.`,
    note: "Brand book · 100×150 · 4 panels"
  },
  {
    label: "Blend philosophy",
    no: "PANEL 2",
    title: "BLENDS",
    subtitle: "Structure first",
    body:
`T.C.H의 블렌드는
“맛의 개성”보다 “용도”를 먼저 정의합니다.

매일 마시는 커피
시그니처로 남는 커피
디저트와 어울리는 커피
묵직한 블랙 커피
밤에도 부담 없는 커피

카페 운영에는
설명이 아니라 구조가 필요합니다.

우리는 5가지 기준으로
선택을 단순화합니다.`,
    note: "Blend = usage design"
  },
  {
    label: "Line-up",
    no: "PANEL 3",
    title: "5 BLENDS",
    subtitle: "NO.1–NO.5",
    list: [
      { h:"NO.1 DAILY", t:"가볍고 산뜻한 고소함 · 기본이 되는 블렌드" },
      { h:"NO.2 SIGNATURE", t:"과일의 깊이와 단맛 · 브랜드를 대표" },
      { h:"NO.3 SWEETNESS", t:"디저트 감각의 크리미함 · 달콤한 메뉴용" },
      { h:"NO.4 DARK", t:"묵직하지만 거칠지 않은 블랙 · 진한 아메리카노" },
      { h:"NO.5 DECAFFEINE", t:"홍시 같은 달콤함 · 밤에도 부담 없는 선택" }
    ],
    note: "모든 블렌드는 레시피 가이드 포함"
  },
  {
    label: "Partners",
    no: "PANEL 4",
    title: "PARTNERS",
    subtitle: "Support system",
    body:
`T.C.H는
원두 공급을 넘어
운영을 돕는 구조를 제공합니다.`,
    list: [
      { h:"월간 원두 업데이트", t:"시즌 흐름과 운영 리듬에 맞춘 제안" },
      { h:"표준화 레시피 가이드", t:"핫/아이스 · 워터 토탈 기준 제공" },
      { h:"추출 세팅 지원", t:"매장 장비/환경에 맞춘 세팅 방향" },
      { h:"블렌드 활용 제안", t:"메뉴/용도별 추천 구조" },
      { h:"브랜드 자료 제공", t:"메뉴보드/설명 카피/가이드 템플릿" }
    ],
    note: "우리는 카페가 커피에 집중할 수 있도록 기준을 만듭니다."
  }
];

let spreadIndex = 0; // 0 => panels 1-2, 1 => panels 3-4

function escapeHtml(str=""){
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function panelHtml(p){
  const title = escapeHtml(p.title || "");
  const subtitle = escapeHtml(p.subtitle || "");
  const body = p.body ? escapeHtml(p.body) : "";
  const note = p.note ? escapeHtml(p.note) : "";

  const list = Array.isArray(p.list) ? `
    <ul class="bullets">
      ${p.list.map(x=>`
        <li>
          <div class="h2">${escapeHtml(x.h || "")}</div>
          <div class="p">${escapeHtml(x.t || "")}</div>
        </li>
      `).join("")}
    </ul>
  ` : "";

  return `
    <article class="panel">
      <div class="panelInner">
        <div class="pLabel">
          <span>${escapeHtml(p.label || "")}</span>
          <span class="pNo">${escapeHtml(p.no || "")}</span>
        </div>
        <div class="hr"></div>

        <h1 class="h1">${title}</h1>
        ${subtitle ? `<div class="h2">${subtitle}</div>` : ""}

        ${body ? `<p class="p">${body}</p>` : ""}
        ${list}

        ${note ? `<div class="note">${note}</div>` : ""}
      </div>
    </article>
  `;
}

function render(){
  const totalSpreads = 2;
  const leftIdx = spreadIndex * 2;
  const rightIdx = leftIdx + 1;

  const left = PANELS[leftIdx];
  const right = PANELS[rightIdx];

  pageTxt.textContent = `${spreadIndex+1}/${totalSpreads}`;

  stage.innerHTML = `
    <div class="spreadHead">
      <div class="spreadTitle">Spread</div>
      <div class="spreadMeta">Panels ${leftIdx+1}–${rightIdx+1}</div>
    </div>

    <div class="spread" role="group" aria-label="Two-panel spread">
      ${panelHtml(left)}
      ${panelHtml(right)}
    </div>
  `;

  prevBtn.disabled = (spreadIndex === 0);
  nextBtn.disabled = (spreadIndex === totalSpreads - 1);
  prevBtn.style.opacity = prevBtn.disabled ? ".45" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? ".45" : "1";
}

function goPrev(){
  if(spreadIndex <= 0) return;
  spreadIndex -= 1;
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function goNext(){
  if(spreadIndex >= 1) return;
  spreadIndex += 1;
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

homeBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  spreadIndex = 0;
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
});

/* keyboard */
window.addEventListener("keydown", (e)=>{
  if(e.key === "ArrowLeft") goPrev();
  if(e.key === "ArrowRight") goNext();
});

render();
