(() => {
  // O HTML original nasceu como protótipo e usa nomes de classe/IDs diferentes
  // da camada conectada. Esta ponte roda antes de app-live.js e deixa o DOM
  // compatível sem reescrever o layout existente.
  const opportunitiesHead = document.querySelector('#oportunidades .panelhead');
  if (opportunitiesHead) opportunitiesHead.classList.add('panel-head');

  const goal = document.querySelector('.goal');
  if (goal) {
    goal.classList.add('goal-value');
    goal.innerHTML = 'US$ <span id="earned">0</span> / US$ 50';
  }

  const progressBar = document.querySelector('.progress > div');
  if (progressBar) progressBar.id = 'progressBar';

  // hydrateMetrics() atualiza h3; o protótipo usava <b>.
  const metrics = Array.from(document.querySelectorAll('.metric'));
  metrics.forEach(metric => {
    const value = metric.querySelector(':scope > b');
    if (!value) return;
    const h3 = document.createElement('h3');
    h3.textContent = value.textContent;
    value.replaceWith(h3);
  });

  const labels = metrics.map(metric => metric.querySelector('.label'));
  const notes = metrics.map(metric => metric.querySelector('small'));
  if (labels[1]) labels[1].textContent = 'Recomendadas';
  if (notes[1]) notes[1].textContent = 'compatibilidade 70%+';
  if (labels[2]) labels[2].textContent = 'Tempo planejado';
  if (notes[2]) notes[2].textContent = 'por dia';

  const style = document.createElement('style');
  style.textContent = `
    .metric h3{display:block;font-size:24px;margin:8px 0 0;letter-spacing:-.04em}
    .opp-top{display:flex;gap:11px;align-items:flex-start}
    .opp-main{min-width:0;flex:1}
    .opp-title{font-size:13px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .opp-sub{font-size:10px;color:#667085;margin-top:4px}
    .opp-data{display:flex;gap:14px;flex-wrap:wrap;margin:12px 0;font-size:11px}
    .opp-data b{font-size:12px}
    .opp-actions{display:flex;gap:8px;flex-wrap:wrap}
    .small-primary,.small-secondary{padding:9px 11px;border-radius:11px;font-size:10px;font-weight:850}
    .small-primary{border:0;background:#111827;color:#fff}
    .small-secondary{background:#fff;color:#475467;border:1px solid #e8eaf0}
  `;
  document.head.appendChild(style);
})();
