const $ = (s)=>document.querySelector(s);

const spreadEl = $("#spread");
const stackEl  = $("#stack");

const prevBtn  = $("#prevBtn");
const nextBtn  = $("#nextBtn");
const pageNow  = $("#pageNow");
const pageAll  = $("#pageAll");
const homeBtn  = $("#homeBtn");

const spreads = (window.BOOK && window.BOOK.spreads) ? window.BOOK.spreads : [];
pageAll.textContent = String(spreads.length || 1);

function escapeHtml(str=""){
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function panelHtml(p){
  const chips = (p.chips || []).map(c=>`<span class="chip">${escapeHtml(c)}</span>`).join("");
  const beanList = (p.beanList || []).map(b=>`
    <div class="beanRow">
      <div class="beanNo">${escapeHtml(b.no)}</div>
      <div class="beanInfo">
        <div class="beanName">${escapeHtml(b.name)}</div>
        <div class="beanMeta">${escapeHtml(b.meta)}</div>
      </div>
    </div>
  `).join("");

  return `
    <article class="panel" role="article" aria-label="${escapeHtml(p.title || "Panel")}">
      <div class="guides" aria-hidden="true">
        <div class="edge"></div>
        <div class="safe"></div>
      </div>

      <div class="pBody">
        <div class="kicker">${escapeHtml(p.kicker || "")}</div>

        <h1 class="h1">${escapeHtml(p.title || "")}</h1>
        ${p.subtitle ? `<h2 class="h2">${escapeHtml(p.subtitle)}</h2>` : ""}

        ${p.body ? `<p class="p">${escapeHtml(p.body)}</p>` : ""}

        ${beanList ? `<div class="hr"></div><div class="beanList">${beanList}</div>` : ""}

        ${chips ? `<div class="chips">${chips}</div>` : ""}
      </div>
    </article>
  `;
}

function getSpreadIndex(){
  const hash = location.hash || "";
  const m = hash.match(/s=(\d+)/);
  const n = m ? parseInt(m[1], 10) : 0;
  if(Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(spreads.length - 1, n));
}

function setSpreadIndex(i){
  const idx = Math.max(0, Math.min(spreads.length - 1, i));
  location.hash = `s=${idx}`;
}

function render(){
  const idx = getSpreadIndex();
  const sp = spreads[idx] || spreads[0];

  pageNow.textContent = String(idx + 1);

  // Desktop spread (2 panels)
  spreadEl.innerHTML = `
    <div class="spreadInner">
      ${panelHtml(sp.left)}
      ${panelHtml(sp.right)}
    </div>
  `;

  // Mobile stack (all 4 panels)
  stackEl.innerHTML = spreads.map((s, i)=>`
    <div class="spreadInner" style="display:grid; grid-template-columns:1fr; gap:14px;">
      ${panelHtml(s.left)}
      ${panelHtml(s.right)}
    </div>
  `).join("");

  // nav disabled look
  prevBtn.disabled = (idx === 0);
  nextBtn.disabled = (idx === spreads.length - 1);
  prevBtn.style.opacity = prevBtn.disabled ? ".45" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? ".45" : "1";
}

prevBtn.addEventListener("click", ()=> setSpreadIndex(getSpreadIndex() - 1));
nextBtn.addEventListener("click", ()=> setSpreadIndex(getSpreadIndex() + 1));
homeBtn.addEventListener("click", (e)=>{ e.preventDefault(); setSpreadIndex(0); });

window.addEventListener("hashchange", render);
render();
