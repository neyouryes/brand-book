const $ = (s)=>document.querySelector(s);

const spreadEl = $("#spread");
const spreadTxt = $("#spreadTxt");
const spreadTotalEl = $("#spreadTotal");

const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const homeBtn = $("#homeBtn");

let BOOK = null;
let spreadIndex = 0; // 0 => pages 1-2, 1 => pages 3-4

function escapeHtml(str=""){
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function panelHtml(page){
  if(!page) return `<div class="panel"><div class="pIn"></div></div>`;

  // cover
  if(page.id === "cover"){
    return `
      <article class="panel" aria-label="Cover">
        <div class="pIn">
          <div class="kicker">${escapeHtml(page.kicker || "")}</div>
          <div class="h1">${escapeHtml(page.h1 || "")}</div>
          <div class="h2">${escapeHtml(page.h2 || "")}</div>
          <div class="p">${escapeHtml(page.body || "")}</div>
          <div style="margin-top:auto"></div>
        </div>
      </article>
    `;
  }

  // philosophy
  if(page.id === "philosophy"){
    const roles = (page.roles || []).map(r=>`
      <div class="row">
        <div class="left">${escapeHtml(r.left)}</div>
        <div class="right">${escapeHtml(r.right)}</div>
      </div>
    `).join("");

    return `
      <article class="panel" aria-label="Blend philosophy">
        <div class="pIn">
          <div class="kicker">${escapeHtml(page.kicker || "")}</div>
          <div class="h1">${escapeHtml(page.h1 || "")}</div>
          <div class="h2">${escapeHtml(page.h2 || "")}</div>
          <div class="p">${escapeHtml(page.body || "")}</div>

          <div class="rule">
            ${roles}
          </div>

          <div style="margin-top:auto"></div>
        </div>
      </article>
    `;
  }

  // five blends
  if(page.id === "five-blends"){
    const cards = (page.blends || []).map(b=>{
      const chips = (b.notes || []).map(n=>`<span class="chip">${escapeHtml(n)}</span>`).join("");
      return `
        <div class="blendCard">
          <div class="blendTop">
            <div class="blNo">${escapeHtml(b.no)}</div>
            <div class="blName">${escapeHtml(b.name)}</div>
          </div>
          <div class="blOne">${escapeHtml(b.one || "")}</div>
          <div class="blNotes">${chips}</div>
        </div>
      `;
    }).join("");

    return `
      <article class="panel" aria-label="Five blends">
        <div class="pIn">
          <div class="kicker">${escapeHtml(page.kicker || "")}</div>
          <div class="h1">${escapeHtml(page.h1 || "")}</div>
          <div class="h2">${escapeHtml(page.h2 || "")}</div>

          <div class="blendGrid">
            ${cards}
          </div>

          <div style="margin-top:auto"></div>
        </div>
      </article>
    `;
  }

  // partners
  if(page.id === "partners"){
    const blocks = (page.blocks || []).map(b=>{
      const lis = (b.items || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
      return `
        <div class="block">
          <div class="blockT">${escapeHtml(b.title || "")}</div>
          <ul class="ul">${lis}</ul>
        </div>
      `;
    }).join("");

    return `
      <article class="panel" aria-label="Partners">
        <div class="pIn">
          <div class="kicker">${escapeHtml(page.kicker || "")}</div>
          <div class="h1">${escapeHtml(page.h1 || "")}</div>
          <div class="h2">${escapeHtml(page.h2 || "")}</div>
          <div class="p">${escapeHtml(page.body || "")}</div>

          <div class="blocks">
            ${blocks}
          </div>

          <div style="margin-top:auto"></div>
        </div>
      </article>
    `;
  }

  // default
  return `
    <article class="panel">
      <div class="pIn">
        <div class="kicker">${escapeHtml(page.kicker || "")}</div>
        <div class="h1">${escapeHtml(page.h1 || "")}</div>
        <div class="h2">${escapeHtml(page.h2 || "")}</div>
        <div class="p">${escapeHtml(page.body || "")}</div>
      </div>
    </article>
  `;
}

function render(){
  const pages = BOOK.pages || [];
  const totalSpreads = Math.ceil(pages.length / 2);

  spreadTotalEl.textContent = String(totalSpreads);
  spreadTxt.textContent = String(spreadIndex + 1);

  const leftPage = pages[spreadIndex * 2];
  const rightPage = pages[spreadIndex * 2 + 1];

  spreadEl.innerHTML = panelHtml(leftPage) + panelHtml(rightPage);

  prevBtn.disabled = spreadIndex <= 0;
  nextBtn.disabled = spreadIndex >= totalSpreads - 1;
}

function go(delta){
  const pages = BOOK.pages || [];
  const totalSpreads = Math.ceil(pages.length / 2);
  spreadIndex = Math.max(0, Math.min(totalSpreads - 1, spreadIndex + delta));
  render();
}

async function init(){
  const res = await fetch("brandbook.json", { cache:"no-store" });
  BOOK = await res.json();

  prevBtn.addEventListener("click", ()=>go(-1));
  nextBtn.addEventListener("click", ()=>go(1));

  homeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    spreadIndex = 0;
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // keyboard navigation
  window.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowLeft") go(-1);
    if(e.key === "ArrowRight") go(1);
  });

  render();
}

init();
