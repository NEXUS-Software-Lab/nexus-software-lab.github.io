(function(){
  const list=document.getElementById('pub-list'); if(!list) return;
  const q=document.getElementById('pub-search'), year=document.getElementById('pub-year'), topic=document.getElementById('pub-topic'), count=document.getElementById('pub-count');
  const all=window.NEXUS_DATA.publications;
  [...new Set(all.map(x=>x.year))].sort((a,b)=>b-a).forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;year.appendChild(o)});
  [...new Set(all.map(x=>x.topic))].sort().forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;topic.appendChild(o)});
  function render(){const needle=q.value.trim().toLowerCase();const items=all.filter(x=>(!needle || [x.title,x.authors,x.venue,x.topic].join(' ').toLowerCase().includes(needle))&&(!year.value||String(x.year)===year.value)&&(!topic.value||x.topic===topic.value));count.textContent=`${items.length} selected publication${items.length===1?'':'s'}`;list.innerHTML=items.length?items.map(x=>`<article class="pub"><div class="pub-year">${x.year}</div><div><h2>${x.title}</h2><p class="authors">${x.authors}</p><p class="venue">${x.venue}</p>${x.award?`<span class="award">${x.award}</span>`:''}</div></article>`).join(''):'<div class="empty">No publications match the current filters.</div>'}
  [q,year,topic].forEach(el=>el.addEventListener(el===q?'input':'change',render));render();
})();