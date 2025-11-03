// Interactive Graph Visualizer with BFS and DFS
(function(){
  class Graph {
    constructor() {
      this.adjacencyList = new Map();
      this.nodes = [];
    }

    addNode(node) {
      if (!this.adjacencyList.has(node)) {
        this.adjacencyList.set(node, []);
        this.nodes.push(node);
      }
    }

    addEdge(node1, node2) {
      if (!this.adjacencyList.has(node1)) this.addNode(node1);
      if (!this.adjacencyList.has(node2)) this.addNode(node2);
      
      // Add bidirectional edge
      if (!this.adjacencyList.get(node1).includes(node2)) {
        this.adjacencyList.get(node1).push(node2);
      }
      if (!this.adjacencyList.get(node2).includes(node1)) {
        this.adjacencyList.get(node2).push(node1);
      }
    }

    bfs(startNode) {
      if (!this.adjacencyList.has(startNode)) return [];
      
      const visited = new Set();
      const queue = [startNode];
      const order = [];

      visited.add(startNode);

      while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);

        const neighbors = this.adjacencyList.get(node) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }

      return order;
    }

    dfs(startNode) {
      if (!this.adjacencyList.has(startNode)) return [];
      
      const visited = new Set();
      const order = [];

      const dfsRecursive = (node) => {
        visited.add(node);
        order.push(node);

        const neighbors = this.adjacencyList.get(node) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            dfsRecursive(neighbor);
          }
        }
      };

      dfsRecursive(startNode);
      return order;
    }

    getEdges() {
      const edges = [];
      const seen = new Set();
      
      for (const [node, neighbors] of this.adjacencyList) {
        for (const neighbor of neighbors) {
          const edgeKey = [node, neighbor].sort().join('-');
          if (!seen.has(edgeKey)) {
            edges.push({ source: node, target: neighbor });
            seen.add(edgeKey);
          }
        }
      }
      
      return edges;
    }

    clear() {
      this.adjacencyList.clear();
      this.nodes = [];
    }
  }

  let graph = new Graph();
  let simulation = null;
  let currentSvg = null;
  let d3Nodes = [];
  let d3Links = [];

  function updateCounts() {
    document.getElementById('node-count').textContent = graph.nodes.length;
    document.getElementById('edge-count').textContent = graph.getEdges().length;
  }

  function render(svg) {
    const width = svg.node().clientWidth || 800;
    const height = 600;
    svg.attr('width', '100%').attr('height', height);
    svg.selectAll('*').remove();

    if (graph.nodes.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#9ca3af')
        .style('font-size', '16px')
        .text('Graph is empty. Add nodes and edges to visualize.');
      updateCounts();
      return;
    }

    // Prepare D3 data
    d3Nodes = graph.nodes.map(id => ({ id }));
    d3Links = graph.getEdges();

    // Create force simulation
    if (simulation) simulation.stop();
    
    simulation = d3.forceSimulation(d3Nodes)
      .force('link', d3.forceLink(d3Links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Draw links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(d3Links)
      .enter()
      .append('line')
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 3);

    // Draw nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(d3Nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', 25)
      .attr('fill', '#4f46e5')
      .attr('stroke', '#4338ca')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 6)
      .attr('fill', '#fff')
      .style('font-weight', 'bold')
      .style('font-size', '14px')
      .text(d => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    updateCounts();
  }

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  async function animateTraversal(svg, order, speed) {
    if (order.length === 0) return;

    // Reset all nodes
    svg.selectAll('.node circle')
      .transition()
      .duration(200)
      .attr('fill', '#4f46e5');

    // Animate traversal
    for (let i = 0; i < order.length; i++) {
      const nodeId = order[i];
      
      // Highlight current node
      svg.selectAll('.node')
        .filter(d => d.id === nodeId)
        .select('circle')
        .transition()
        .duration(speed / 2)
        .attr('fill', '#f59e0b')
        .transition()
        .duration(speed / 2)
        .attr('fill', '#10b981');

      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }

  window.AlgoSphereGraphs = {
    init: function(svgSel) {
      currentSvg = d3.select(svgSel);
      if (currentSvg.empty()) return;

      render(currentSvg);

      // Speed slider
      const speedSlider = document.getElementById('speed-slider');
      const speedDisplay = document.getElementById('speed-display');
      speedSlider?.addEventListener('input', (e) => {
        speedDisplay.textContent = e.target.value + 'ms';
      });

      // Add nodes
      document.getElementById('add-nodes-btn')?.addEventListener('click', () => {
        const input = document.getElementById('node-input');
        const values = input.value.split(',').map(v => v.trim()).filter(v => v);
        
        if (values.length === 0) {
          alert('Please enter node values (comma-separated numbers)');
          return;
        }

        values.forEach(v => {
          const num = parseInt(v);
          if (!isNaN(num)) {
            graph.addNode(num);
          }
        });

        input.value = '';
        render(currentSvg);
      });

      // Add edge
      document.getElementById('add-edge-btn')?.addEventListener('click', () => {
        const from = parseInt(document.getElementById('edge-from').value);
        const to = parseInt(document.getElementById('edge-to').value);

        if (isNaN(from) || isNaN(to)) {
          alert('Please enter valid node numbers for both fields');
          return;
        }

        if (!graph.adjacencyList.has(from) || !graph.adjacencyList.has(to)) {
          alert('Both nodes must exist in the graph first');
          return;
        }

        graph.addEdge(from, to);
        document.getElementById('edge-from').value = '';
        document.getElementById('edge-to').value = '';
        render(currentSvg);
      });

      // Sample graph
      document.getElementById('sample-graph')?.addEventListener('click', () => {
        graph.clear();
        [1, 2, 3, 4, 5, 6].forEach(n => graph.addNode(n));
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(2, 5);
        graph.addEdge(3, 6);
        graph.addEdge(4, 5);
        render(currentSvg);
      });

      // Clear graph
      document.getElementById('clear-graph')?.addEventListener('click', () => {
        graph.clear();
        render(currentSvg);
        document.getElementById('traversal-order').innerHTML = 'Ready to traverse';
      });

      // BFS
      document.getElementById('bfs-btn')?.addEventListener('click', async () => {
        const startNode = parseInt(document.getElementById('start-node').value);
        if (isNaN(startNode) || !graph.adjacencyList.has(startNode)) {
          alert('Please enter a valid start node that exists in the graph');
          return;
        }

        const order = graph.bfs(startNode);
        document.getElementById('traversal-order').innerHTML = 
          `<strong>BFS:</strong> ${order.join(' → ')}`;
        
        const speed = parseInt(document.getElementById('speed-slider').value);
        await animateTraversal(currentSvg, order, speed);
      });

      // DFS
      document.getElementById('dfs-btn')?.addEventListener('click', async () => {
        const startNode = parseInt(document.getElementById('start-node').value);
        if (isNaN(startNode) || !graph.adjacencyList.has(startNode)) {
          alert('Please enter a valid start node that exists in the graph');
          return;
        }

        const order = graph.dfs(startNode);
        document.getElementById('traversal-order').innerHTML = 
          `<strong>DFS:</strong> ${order.join(' → ')}`;
        
        const speed = parseInt(document.getElementById('speed-slider').value);
        await animateTraversal(currentSvg, order, speed);
      });

      // Enter key handlers
      document.getElementById('node-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('add-nodes-btn').click();
      });

      document.getElementById('edge-to')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('add-edge-btn').click();
      });
    }
  };
})();

