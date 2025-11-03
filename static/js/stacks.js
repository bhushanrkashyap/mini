// Simple D3 stack visualizer using rectangles stacked vertically
(function(){
  function render(svg, data){
    svg.innerHTML='';
    const width = svg.clientWidth || 600; const height = svg.clientHeight || 300;
    const g = d3.select(svg).append('g');
    const itemH = Math.min(60, Math.floor((height-20)/Math.max(1,data.length)) );
    data.forEach((v,i)=>{
      g.append('rect')
        .attr('x', (width/2)-100)
        .attr('y', height - (i+1)* (itemH+6) - 10)
        .attr('width', 200)
        .attr('height', itemH)
        .attr('rx',8)
        .attr('class','bar')
        .style('fill','#6366f1')
        .style('opacity',0.95);
      g.append('text')
        .attr('x', width/2)
        .attr('y', height - (i+1)*(itemH+6) - 10 + itemH/2 + 6)
        .attr('text-anchor','middle')
        .attr('fill','#fff')
        .text(v);
    });
    
    // Update size counter
    const sizeEl = document.getElementById('stack-size');
    if(sizeEl) sizeEl.textContent = data.length;
  }

  window.AlgoSphereStacks = {
    init: function(svgSel){
      const svg = document.querySelector(svgSel); if(!svg) return; svg.setAttribute('height',300); svg.style.width='100%'; svg.style.height='300px';
      let stack = [5,3,8]; 
      render(svg,stack);
      
      // Set initial size
      setTimeout(() => {
        const sizeEl = document.getElementById('stack-size');
        if(sizeEl) sizeEl.textContent = stack.length;
      }, 100);
      
      document.getElementById('push-btn')?.addEventListener('click', ()=>{
        const v = document.getElementById('stack-value')?.value.trim(); const val = v? v : prompt('Value to push:'); if(val===null) return; stack.push(val); document.getElementById('stack-value').value=''; render(svg,stack);
      });
      document.getElementById('pop-btn')?.addEventListener('click', ()=>{ if(stack.length===0){ alert('Stack empty'); return;} stack.pop(); render(svg,stack); });
      document.getElementById('clear-stack')?.addEventListener('click', ()=>{ stack=[]; render(svg,stack); });
    }
  };
})();
