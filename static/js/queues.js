// Simple D3 queue visualizer using rectangles horizontally
(function(){
  function render(svg, data){
    svg.innerHTML='';
    const width = svg.clientWidth || 800; const height = svg.clientHeight || 120;
    const g = d3.select(svg).append('g');
    const itemW = Math.min(90, Math.floor((width-20)/Math.max(1,data.length)) );
    data.forEach((v,i)=>{
      g.append('rect')
        .attr('x', 20 + i*(itemW+10))
        .attr('y', height/2 - 20)
        .attr('width', itemW)
        .attr('height', 40)
        .attr('rx',8)
        .attr('class','bar')
        .style('fill','#4f46e5')
        .style('opacity',0.95);
      g.append('text')
        .attr('x', 20 + i*(itemW+10) + itemW/2)
        .attr('y', height/2 + 6)
        .attr('text-anchor','middle')
        .attr('fill','#fff')
        .text(v);
    });
    
    // Update size counter
    const sizeEl = document.getElementById('queue-size');
    if(sizeEl) sizeEl.textContent = data.length;
  }

  window.AlgoSphereQueues = {
    init: function(svgSel){
      const svg = document.querySelector(svgSel); if(!svg) return; svg.setAttribute('height',160); svg.style.width='100%'; svg.style.height='160px';
      let queue = [4,2,7]; 
      render(svg,queue);
      
      // Set initial size
      setTimeout(() => {
        const sizeEl = document.getElementById('queue-size');
        if(sizeEl) sizeEl.textContent = queue.length;
      }, 100);
      
      document.getElementById('enqueue-btn')?.addEventListener('click', ()=>{
        const v = document.getElementById('queue-value')?.value.trim(); const val = v? v : prompt('Value to enqueue:'); if(val===null) return; queue.push(val); document.getElementById('queue-value').value=''; render(svg,queue);
      });
      document.getElementById('dequeue-btn')?.addEventListener('click', ()=>{ if(queue.length===0){ alert('Queue empty'); return;} queue.shift(); render(svg,queue); });
      document.getElementById('clear-queue')?.addEventListener('click', ()=>{ queue=[]; render(svg,queue); });
    }
  };
})();
