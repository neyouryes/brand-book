const $ = (s)=>document.querySelector(s);

const homeBtn = $("#homeBtn");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const pageL = $("#pageL");
const pageR = $("#pageR");
const spreadName = $("#spreadName");
const pageHint = $("#pageHint");

let activeSpread = 0;

/* =========================
   BRAND BOOK CONTENT
========================= */

const BOOK = [

/* ======================================
   SPREAD 01  (PAGE 01–02)
====================================== */
{
  name: "Spread 01",
  hint: "01–02",

  left: () => `
    <div class="coverMark">
      <div class="coverTch">T.C.H</div>
      <div class="coverDots">
        <i class="coverDot"></i><i class="coverDot"></i>
        <i class="coverDot"></i><i class="coverDot"></i>
        <i class="coverDot"></i>
      </div>
    </div>

    <div class="kicker">Brand Book</div>
    <div class="coverTitle">
      To.<br/>
      coffee<br/>
      haus
    </div>

    <div class="coverSub">
      roasting · archive · partners
    </div>

    <div class="rule"></div>

    <div class="p">
우리는 매장을 운영하는 브랜드가 아닙니다.
우리는 매장을 완성시키는 브랜드입니다.

To. coffee haus는
오직 로스팅과 파트너스 운영에 집중합니다.
    </div>
  `,

  right: () => `
    <div class="kicker">Blend Philosophy</div>
    <div class="h1">
      Blend is not a mix.<br/>
      It is a system.
    </div>

    <div class="p" style="margin-top:14px">
블렌드는 단순한 조합이 아니라,
매장의 안정성을 설계하는 구조입니다.

맛의 일관성,
원가 효율,
메뉴 확장성까지 고려한
운영 중심 블렌드를 만듭니다.
    </div>

    <div class="rule"></div>

    <div class="h2">Our Standard</div>
    <div class="p">
· 명확한 단맛 중심의 구조  
· 16.8g 도징 기준 설계  
· 진하지만 부담 없는 밀도  
· 매장 환경에서 재현 가능한 레시피
    </div>
  `
},

/* ======================================
   SPREAD 02  (PAGE 03–04)
====================================== */
{
  name: "Spread 02",
  hint: "03–04",

  left: () => `
    <div class="kicker">Core Blend Line</div>
    <div class="h1">Five Stable Structures</div>

    <div class="p" style="margin-top:12px">
매장의 톤과 고객층에 맞춰
가장 안정적으로 사용할 수 있는
5가지 블렌드 구조.
    </div>

    <div class="grid5">

      ${beanCard("NO.1","DAILY",
        "Cashew Nut · Caramel · Milk Chocolate")}

      ${beanCard("NO.2","SIGNATURE",
        "Kyoho Grape · Dried Plum · Red Wine · Syrup")}

      ${beanCard("NO.3","SWEETNESS",
        "Tiramisu · Digestive Cookie · Oatmeal")}

      ${beanCard("NO.4","DARK",
        "Dark Chocolate · Roasted Walnut · Long Finish")}

      ${beanCard("NO.5","DECAFFEINE",
        "Persimmon · Caramel · Popcorn · Juicy")}

    </div>
  `,

  right: () => `
    <div class="kicker">Partners Benefit</div>
    <div class="h1">
      We invest<br/>
      in your stability.
    </div>

    <div class="p" style="margin-top:12px">
To. coffee haus는
파트너 한 곳, 한 곳에 깊이 관여합니다.
    </div>

    <div class="rule"></div>

    <div style="display:grid; gap:10px;">

      ${benefitCard("01","Focused Partnership",
`정기 방문 · 세팅 점검 · 운영 피드백.
공급자가 아닌 운영 파트너로 함께합니다.`)}

      ${benefitCard("02","Free Education",
`추출 세팅 · 팀 교육 · 레시피 교정은 무상 제공.
항상 같은 맛이 나오도록 구조를 맞춥니다.`)}

      ${benefitCard("03","16.8g Efficiency",
`16.8g 도징 기준으로도 충분히 진한 밀도.
20g 대비 원가 절감 · 로스 최소화.
운영 효율을 함께 설계합니다.`)}

      ${benefitCard("04","Menu & Design Support",
`메뉴 개발 및 패키지 디자인은
소정의 비용으로 지원합니다.
매장의 방향성을 함께 설계합니다.`)}

    </div>

    <div class="rule"></div>

    <div class="p">
To. coffee haus  
For partners, with precision.
    </div>
  `
}

];


/* =========================
   COMPONENTS
========================= */

function beanCard(no, name, note){
  return `
    <div class="bean">
      <div class="beanTop">
        <div class="beanNo">${escapeHtml(no)}</div>
        <div class="beanName">${escapeHtml(name)}</div>
      </div>
      <div class="beanNote">${escapeHtml(note)}</div>
    </div>
  `;
}

function benefitCard(no, title, text){
  return `
    <div class="benefit">
      <div class="bTop">
        <div class="bNo">${escapeHtml(no)}</div>
        <div class="bTitle">${escapeHtml(title)}</div>
      </div>
      <div class="bText">${escapeHtml(text)}</div>
    </div>
  `;
}

function escapeHtml(str=""){
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

/* =========================
   UI
========================= */

function setSpread(idx){
  activeSpread = Math.max(0, Math.min(BOOK.length-1, idx));
  const s = BOOK[activeSpread];

  spreadName.textContent = s.name;
  pageHint.textContent = s.hint;

  pageL.innerHTML = s.left();
  pageR.innerHTML = s.right();

  prevBtn.disabled = activeSpread === 0;
  nextBtn.disabled = activeSpread === BOOK.length-1;

  prevBtn.style.opacity = prevBtn.disabled ? .5 : 1;
  nextBtn.style.opacity = nextBtn.disabled ? .5 : 1;
}

function bind(){
  homeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    setSpread(0);
  });

  prevBtn.addEventListener("click", ()=> setSpread(activeSpread - 1));
  nextBtn.addEventListener("click", ()=> setSpread(activeSpread + 1));

  window.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowLeft") setSpread(activeSpread - 1);
    if(e.key === "ArrowRight") setSpread(activeSpread + 1);
  });
}

bind();
setSpread(0);
