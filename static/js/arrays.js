(() => {
  function createBars(svg, data) {
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 300;
    const margin = {top:20,right:20,bottom:30,left:20};
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    const x = d3.scaleBand().domain(d3.range(data.length)).range([0,w]).padding(0.15);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([h,0]);

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
    
    d3.select(svg).selectAll('*').remove();
    const root = d3.select(svg).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    root.selectAll('rect').data(data).enter().append('rect')
      .attr('class','bar')
      .attr('x',(d,i)=>x(i))
      .attr('y',d=>y(d))
      .attr('width', x.bandwidth())
      .attr('height',d=>h - y(d))
      .style('fill', (d,i) => highlight.includes(i) ? '#f59e0b' : (i<=sortedIndex ? '#10b981' : 'var(--accent)'))
      .style('opacity',0.95);

    root.selectAll('text.val').data(data).enter().append('text')
      .attr('class','val muted')
      .attr('text-anchor','middle')
      .attr('x',(d,i)=>x(i)+x.bandwidth()/2)
      .attr('y',d=>y(d)-6)
      .text(d=>d);
  }

  window.AlgoSphereArrays = {
    init: function(svgSelector){
      const svg = document.querySelector(svgSelector);
      if(!svg) return;
      svg.setAttribute('width','100%'); svg.setAttribute('height','320'); svg.style.width='100%'; svg.style.height='320px';
      let data = d3.shuffle(d3.range(5, 50)).slice(0, 12);
      createBars(svg, data);

      document.getElementById('new-array')?.addEventListener('click', ()=>{ data = d3.shuffle(d3.range(5, 50)).slice(0, 12); createBars(svg, data); });
      document.getElementById('load-array')?.addEventListener('click', ()=>{
        const v = document.getElementById('manual-array')?.value.trim(); if(!v) return; const parsed = v.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)); if(parsed.length>0){ data = parsed; createBars(svg,data); }
      });

      document.getElementById('run-algo')?.addEventListener('click', async ()=>{
        const alg = document.getElementById('alg-select')?.value;
        const speed = parseInt(document.getElementById('speed')?.value || 300);
        if(alg === 'Bubble Sort') await bubbleSort(data, svg, speed);
        else if(alg === 'Selection Sort') await selectionSort(data, svg, speed);
        else if(alg === 'Insertion Sort') await insertionSort(data, svg, speed);
        else if(alg === 'Merge Sort') await mergeSort(data, svg, speed);
        else if(alg === 'Quick Sort') await quickSort(data, svg, speed);
        else if(alg === 'Linear Search') await linearSearch(data, svg, speed);
        else if(alg === 'Binary Search') await binarySearch(data, svg, speed);
      });
    }
  };

  window.AlgoSphereArrays.render = function(svgSelector, data){
    const svg = typeof svgSelector === 'string' ? document.querySelector(svgSelector) : svgSelector;
    if(!svg) return;
    svg.setAttribute('width','100%'); svg.style.width='100%';
    if(!svg.getAttribute('height')) svg.setAttribute('height','240');
    createBars(svg, data);
  };

  async function bubbleSort(arr, svg, speed=250){
    for(let i=0;i<arr.length-1;i++){
      for(let j=0;j<arr.length-i-1;j++){
        updateBars(svg, arr, [j,j+1]);
        await new Promise(r=>setTimeout(r,speed));
        if(arr[j] > arr[j+1]){ 
          [arr[j],arr[j+1]] = [arr[j+1],arr[j]]; 
          updateBars(svg, arr, [j,j+1]); 
          await new Promise(r=>setTimeout(r,speed)); 
        }
      }
    }
    updateBars(svg, arr, []);
  }

  async function selectionSort(arr, svg, speed=200){
    for(let i=0;i<arr.length;i++){
      let min=i;
      for(let j=i+1;j<arr.length;j++){
        updateBars(svg, arr, [min,j]); 
        await new Promise(r=>setTimeout(r,speed)); 
        if(arr[j] < arr[min]) min=j;
      }
      if(min !== i){ 
        [arr[i],arr[min]]=[arr[min],arr[i]]; 
        updateBars(svg, arr, [i,min]); 
        await new Promise(r=>setTimeout(r,speed*1.5)); 
      }
    }
    updateBars(svg, arr, []);
  }

  async function insertionSort(arr, svg, speed=250){
    for(let i=1;i<arr.length;i++){
      let key = arr[i];
      let j = i-1;
      updateBars(svg, arr, [i]);
      await new Promise(r=>setTimeout(r,speed));
      
      while(j>=0 && arr[j]>key){
        updateBars(svg, arr, [j,j+1]);
        await new Promise(r=>setTimeout(r,speed));
        arr[j+1] = arr[j];
        updateBars(svg, arr, [j,j+1]);
        await new Promise(r=>setTimeout(r,speed));
        j--;
      }
      arr[j+1] = key;
      updateBars(svg, arr, [j+1]);
      await new Promise(r=>setTimeout(r,speed));
    }
    updateBars(svg, arr, []);
  }

  async function mergeSort(arr, svg, speed=300){
    
    async function merge(left, mid, right){
      let n1 = mid - left + 1;
      let n2 = right - mid;
      let L = [], R = [];
      
      for(let i=0;i<n1;i++) L[i] = arr[left+i];
      for(let j=0;j<n2;j++) R[j] = arr[mid+1+j];
      
      let i=0, j=0, k=left;
      
      while(i<n1 && j<n2){
        updateBars(svg, arr, [left+i, mid+1+j]);
        await new Promise(r=>setTimeout(r,speed));
        
        if(L[i] <= R[j]){
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        updateBars(svg, arr, [k]);
        await new Promise(r=>setTimeout(r,speed));
        k++;
      }
      
      while(i<n1){
        arr[k] = L[i];
        updateBars(svg, arr, [k]);
        await new Promise(r=>setTimeout(r,speed/2));
        i++; k++;
      }
      
      while(j<n2){
        arr[k] = R[j];
        updateBars(svg, arr, [k]);
        await new Promise(r=>setTimeout(r,speed/2));
        j++; k++;
      }
    }
    
    async function mergeSortHelper(left, right){
      if(left < right){
        let mid = Math.floor((left+right)/2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid+1, right);
        await merge(left, mid, right);
      }
    }
    
    await mergeSortHelper(0, arr.length-1);
    updateBars(svg, arr, []);
  }

  async function quickSort(arr, svg, speed=250){
    
    async function partition(low, high){
      let pivot = arr[high];
      let i = low - 1;
      
      updateBars(svg, arr, [high]);
      await new Promise(r=>setTimeout(r,speed));
      
      for(let j=low;j<high;j++){
        updateBars(svg, arr, [j, high]);
        await new Promise(r=>setTimeout(r,speed));
        
        if(arr[j] < pivot){
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          updateBars(svg, arr, [i, j]);
          await new Promise(r=>setTimeout(r,speed));
        }
      }
      
      [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
      updateBars(svg, arr, [i+1, high]);
      await new Promise(r=>setTimeout(r,speed));
      return i+1;
    }
    
    async function quickSortHelper(low, high){
      if(low < high){
        let pi = await partition(low, high);
        await quickSortHelper(low, pi-1);
        await quickSortHelper(pi+1, high);
      }
    }
    
    await quickSortHelper(0, arr.length-1);
    updateBars(svg, arr, []);
  }

  async function linearSearch(arr, svg, speed=300){
    const searchInput = document.getElementById('search-value');
    const messageDiv = document.getElementById('search-message');
    const val = parseInt(searchInput?.value);
    
    if(!searchInput || isNaN(val)) {
      if(messageDiv) {
        messageDiv.textContent = '⚠️ Please enter a valid number in the search field';
        messageDiv.style.color = '#f59e0b';
        setTimeout(() => { messageDiv.textContent = ''; }, 3000);
      }
      return;
    }
    
    for(let i=0;i<arr.length;i++){
      updateBars(svg, arr, [i]);
      await new Promise(r=>setTimeout(r,speed));
      
      if(arr[i] === val){
        updateBars(svg, arr, [i], i);
        if(messageDiv) {
          messageDiv.textContent = `✅ Found ${val} at index ${i}!`;
          messageDiv.style.color = '#10b981';
          setTimeout(() => { messageDiv.textContent = ''; }, 4000);
        }
        return;
      }
    }
    
    updateBars(svg, arr, []);
    if(messageDiv) {
      messageDiv.textContent = `❌ Value ${val} not found in the array`;
      messageDiv.style.color = '#ef4444';
      setTimeout(() => { messageDiv.textContent = ''; }, 4000);
    }
  }

  async function binarySearch(arr, svg, speed=400){
    const searchInput = document.getElementById('search-value');
    const messageDiv = document.getElementById('search-message');
    const val = parseInt(searchInput?.value);
    
    if(!searchInput || isNaN(val)) {
      if(messageDiv) {
        messageDiv.textContent = '⚠️ Please enter a valid number in the search field';
        messageDiv.style.color = '#f59e0b';
        setTimeout(() => { messageDiv.textContent = ''; }, 3000);
      }
      return;
    }
    
    arr.sort((a,b)=>a-b);
    updateBars(svg, arr, []);
    await new Promise(r=>setTimeout(r,500));
    
    if(messageDiv) {
      messageDiv.textContent = '🔄 Array sorted, now searching...';
      messageDiv.style.color = '#6366f1';
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while(left <= right){
      let mid = Math.floor((left + right) / 2);
      
      updateBars(svg, arr, [left, mid, right]);
      await new Promise(r=>setTimeout(r,speed));
      
      if(arr[mid] === val){
        updateBars(svg, arr, [mid], mid);
        if(messageDiv) {
          messageDiv.textContent = `✅ Found ${val} at index ${mid}!`;
          messageDiv.style.color = '#10b981';
          setTimeout(() => { messageDiv.textContent = ''; }, 4000);
        }
        return;
      }
      
      if(arr[mid] < val){
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    updateBars(svg, arr, []);
    if(messageDiv) {
      messageDiv.textContent = `❌ Value ${val} not found in the array`;
      messageDiv.style.color = '#ef4444';
      setTimeout(() => { messageDiv.textContent = ''; }, 4000);
    }
  }

  function recordBubbleSteps(arr){
    const a = arr.slice();
    const steps = [];
    for(let i=0;i<a.length-1;i++){
      for(let j=0;j<a.length-i-1;j++){
        steps.push({type:'compare',i:j,j:j+1});
        if(a[j] > a[j+1]){ steps.push({type:'swap',i:j,j:j+1}); [a[j],a[j+1]]=[a[j+1],a[j]]; }
      }
      steps.push({type:'mark',index:a.length-1-i});
    }
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

  function recordInsertionSteps(arr){
    const a = arr.slice();
    const steps = [];
    for(let i=1;i<a.length;i++){
      let key = a[i];
      let j = i-1;
      while(j>=0 && a[j]>key){
        steps.push({type:'compare',i:j,j:j+1});
        steps.push({type:'swap',i:j,j:j+1});
        [a[j], a[j+1]] = [a[j+1], a[j]];
        j--;
      }
      if(j>=0) steps.push({type:'compare',i:j,j:j+1});
    }
    for(let i=0;i<a.length;i++) steps.push({type:'mark',index:i});
    return steps;
  }

  function recordMergeSteps(arr){
    const a = arr.slice();
    const steps = [];
    
    function merge(left, right, start){
      let i=0, j=0, k=start;
      const merged = [];
      while(i<left.length && j<right.length){
        steps.push({type:'compare',i:start+i,j:start+left.length+j});
        if(left[i]<=right[j]){
          merged.push(left[i]);
          a[k++]=left[i++];
        } else {
          merged.push(right[j]);
          a[k++]=right[j++];
        }
      }
      while(i<left.length){ merged.push(left[i]); a[k++]=left[i++]; }
      while(j<right.length){ merged.push(right[j]); a[k++]=right[j++]; }
      return merged;
    }
    
    function mergeSort(start, end){
      if(end-start<=1) return [a[start]];
      const mid = Math.floor((start+end)/2);
      const left = mergeSort(start, mid);
      const right = mergeSort(mid, end);
      return merge(left, right, start);
    }
    
    mergeSort(0, a.length);
    for(let i=0;i<a.length;i++) steps.push({type:'mark',index:i});
    return steps;
  }

  function recordQuickSteps(arr){
    const a = arr.slice();
    const steps = [];
    
    function partition(low, high){
      const pivot = a[high];
      let i = low-1;
      for(let j=low;j<high;j++){
        steps.push({type:'compare',i:j,j:high});
        if(a[j]<pivot){
          i++;
          if(i!==j){
            steps.push({type:'swap',i:i,j:j});
            [a[i],a[j]]=[a[j],a[i]];
          }
        }
      }
      if(i+1!==high){
        steps.push({type:'swap',i:i+1,j:high});
        [a[i+1],a[high]]=[a[high],a[i+1]];
      }
      return i+1;
    }
    
    function quickSort(low, high){
      if(low<high){
        const pi = partition(low, high);
        quickSort(low, pi-1);
        quickSort(pi+1, high);
      }
    }
    
    quickSort(0, a.length-1);
    for(let i=0;i<a.length;i++) steps.push({type:'mark',index:i});
    return steps;
  }

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
        sortedIndex = Math.max(sortedIndex, step.index);
        updateBars(svgEl, data, [], sortedIndex);
        await sleep(Math.max(80, speed/1.5));
      }
    }
    updateBars(svgEl, data, [], data.length-1);
    return data;
  }

  window.AlgoSphereArrays.play = async function(svgSelector, arr, algName, speed=250){
    let steps = [];
    if(algName === 'Bubble Sort'){
      steps = recordBubbleSteps(arr);
    } else if(algName === 'Selection Sort'){
      steps = recordSelectionSteps(arr);
    } else if(algName === 'Insertion Sort'){
      steps = recordInsertionSteps(arr);
    } else if(algName === 'Merge Sort'){
      steps = recordMergeSteps(arr);
    } else if(algName === 'Quick Sort'){
      steps = recordQuickSteps(arr);
    }
    
    const start = performance.now();
    await animateSteps(svgSelector, arr, steps, speed);
    const end = performance.now();
    return {time:(end-start).toFixed(2)};
  };

})();
