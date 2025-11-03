// D3-based array visualizer (bars) with simple animations
(() => {
  function createBars(svg, data) {
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 300;
    const margin = {top:20,right:20,bottom:30,left:20};
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    const x = d3.scaleBand().domain(d3.range(data.length)).range([0,w]).padding(0.15);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([h,0]);

    // CLEAR ALL EXISTING CONTENT
    d3.select(svg).selectAll('*').remove();
    
    const root = d3.select(svg).append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    root.selectAll('rect').data(data).enter().append('rect')
      .attr('class','bar')
      .attr('x',(d,i)=>x(i))
      .attr('y',d=>y(d))
      .attr('width', x.bandwidth())
      .attr('height', d=>h - y(d))
      .style('opacity',0.95);

    root.selectAll('text.val').data(data).enter().append('text')
      .attr('x',(d,i)=>x(i)+x.bandwidth()/2)
      .attr('y',d=>y(d)-6)
      .attr('text-anchor','middle')
      .attr('class','muted')
      .text(d=>d);
  }

  function updateBars(svg, data, highlight=[], sortedIndex=-1) {
    const margin = {top:20,right:20,bottom:30,left:20};
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 300;
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    const x = d3.scaleBand().domain(d3.range(data.length)).range([0,w]).padding(0.15);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([h,0]);
    
    // COMPLETELY CLEAR and recreate
    d3.select(svg).selectAll('*').remove();
    const root = d3.select(svg).append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Create fresh bars
    root.selectAll('rect').data(data).enter().append('rect')
      .attr('class','bar')
      .attr('x',(d,i)=>x(i))
      .attr('y',d=>y(d))
      .attr('width', x.bandwidth())
      .attr('height',d=>h - y(d))
      .style('fill', (d,i) => highlight.includes(i) ? '#f59e0b' : (i<=sortedIndex ? '#10b981' : 'var(--accent)'))
      .style('opacity',0.95);

    // Create fresh text labels
    root.selectAll('text.val').data(data).enter().append('text')
      .attr('class','val muted')
      .attr('text-anchor','middle')
      .attr('x',(d,i)=>x(i)+x.bandwidth()/2)
      .attr('y',d=>y(d)-6)
      .text(d=>d);
  }

  // Exposed functions and wiring
  window.AlgoSphereArrays = {
    init: function(svgSelector){
      const svg = document.querySelector(svgSelector);
      if(!svg) return;
      // set viewbox sizing
      svg.setAttribute('width','100%'); svg.setAttribute('height','320'); svg.style.width='100%'; svg.style.height='320px';
      let data = d3.shuffle(d3.range(5, 50)).slice(0, 12);
      createBars(svg, data);

      document.getElementById('new-array')?.addEventListener('click', ()=>{ data = d3.shuffle(d3.range(5, 50)).slice(0, 12); createBars(svg, data); });
      document.getElementById('load-array')?.addEventListener('click', ()=>{
        const v = document.getElementById('manual-array')?.value.trim(); if(!v) return; const parsed = v.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)); if(parsed.length>0){ data = parsed; createBars(svg,data); }
      });

      document.getElementById('run-algo')?.addEventListener('click', async ()=>{
        const alg = document.getElementById('alg-select')?.value;
        if(alg === 'Bubble Sort') await bubbleSort(data, svg);
        else if(alg === 'Selection Sort') await selectionSort(data, svg);
        else alert('Try Bubble or Selection for animated demo');
      });
    }
  };

  // Expose small helper to render an array immediately (used by comparison)
  window.AlgoSphereArrays.render = function(svgSelector, data){
    const svg = typeof svgSelector === 'string' ? document.querySelector(svgSelector) : svgSelector;
    if(!svg) return;
    svg.setAttribute('width','100%'); svg.style.width='100%';
    // quick height handling
    if(!svg.getAttribute('height')) svg.setAttribute('height','240');
    createBars(svg, data);
  };

  async function bubbleSort(arr, svg){
    console.log('Bubble Sort - Initial array:', JSON.stringify(arr));
    for(let i=0;i<arr.length-1;i++){
      for(let j=0;j<arr.length-i-1;j++){
        updateBars(svg, arr, [j,j+1]);
        await new Promise(r=>setTimeout(r,250));
        if(arr[j] > arr[j+1]){ 
          console.log(`Swapping arr[${j}]=${arr[j]} with arr[${j+1}]=${arr[j+1]}`);
          [arr[j],arr[j+1]] = [arr[j+1],arr[j]]; 
          updateBars(svg, arr, [j,j+1]); 
          await new Promise(r=>setTimeout(r,250)); 
        }
      }
    }
    console.log('Bubble Sort - Final array:', JSON.stringify(arr));
    updateBars(svg, arr, []);
  }

  async function selectionSort(arr, svg){
    console.log('Selection Sort - Initial array:', JSON.stringify(arr));
    for(let i=0;i<arr.length;i++){
      let min=i;
      for(let j=i+1;j<arr.length;j++){
        updateBars(svg, arr, [min,j]); 
        await new Promise(r=>setTimeout(r,200)); 
        if(arr[j] < arr[min]) min=j;
      }
      if(min !== i){ 
        console.log(`Swapping arr[${i}]=${arr[i]} with arr[${min}]=${arr[min]}`);
        [arr[i],arr[min]]=[arr[min],arr[i]]; 
        updateBars(svg, arr, [i,min]); 
        await new Promise(r=>setTimeout(r,300)); 
      }
    }
    console.log('Selection Sort - Final array:', JSON.stringify(arr));
    updateBars(svg, arr, []);
  }

  // Recording versions that return a list of steps for an algorithm
  function recordBubbleSteps(arr){
    const a = arr.slice();
    const steps = [];
    for(let i=0;i<a.length-1;i++){
      for(let j=0;j<a.length-i-1;j++){
        steps.push({type:'compare',i:j,j:j+1});
        if(a[j] > a[j+1]){ steps.push({type:'swap',i:j,j:j+1}); [a[j],a[j+1]]=[a[j+1],a[j]]; }
      }
      // mark that position as sorted
      steps.push({type:'mark',index:a.length-1-i});
    }
    // finally mark index 0
    steps.push({type:'mark',index:0});
    return steps;
  }

  function recordSelectionSteps(arr){
    const a = arr.slice();
    const steps = [];
    for(let i=0;i<a.length;i++){
      let min=i;
      for(let j=i+1;j<a.length;j++){
        steps.push({type:'compare',i:min,j:j});
        if(a[j] < a[min]){ min=j; }
      }
      if(min !== i){ steps.push({type:'swap',i:i,j:min}); [a[i],a[min]]=[a[min],a[i]]; }
      steps.push({type:'mark',index:i});
    }
    return steps;
  }

  // Animate a recorded set of steps on a given SVG element
  async function animateSteps(svg, initialArray, steps, speed=250){
    const svgEl = typeof svg === 'string' ? document.querySelector(svg) : svg;
    if(!svgEl) return;
    let data = initialArray.slice();
    createBars(svgEl, data);
    let sortedIndex = -1;
    const sleep = ms => new Promise(r=>setTimeout(r,ms));
    for(const step of steps){
      if(step.type === 'compare'){
        updateBars(svgEl, data, [step.i, step.j], sortedIndex);
        await sleep(speed);
      } else if(step.type === 'swap'){
        [data[step.i], data[step.j]] = [data[step.j], data[step.i]];
        updateBars(svgEl, data, [step.i, step.j], sortedIndex);
        await sleep(Math.max(60, speed));
      } else if(step.type === 'mark'){
        // mark indicates that index is now in final sorted position
        sortedIndex = Math.max(sortedIndex, step.index);
        updateBars(svgEl, data, [], sortedIndex);
        await sleep(Math.max(80, speed/1.5));
      }
    }
    // final tidy
    updateBars(svgEl, data, [], data.length-1);
    return data;
  }

  // High-level playback helper exposed to other pages
  window.AlgoSphereArrays.play = async function(svgSelector, arr, algName, speed=250){
    const steps = algName === 'Bubble Sort' ? recordBubbleSteps(arr) : (algName === 'Selection Sort' ? recordSelectionSteps(arr) : []);
    const start = performance.now();
    await animateSteps(svgSelector, arr, steps, speed);
    const end = performance.now();
    return {time:(end-start).toFixed(2)};
  };

})();
