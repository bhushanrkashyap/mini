(function(){
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  class BinaryTree {
    constructor() {
      this.root = null;
      this.nodeCount = 0;
    }

    insertBST(value) {
      const newNode = new TreeNode(value);
      if (!this.root) {
        this.root = newNode;
        this.nodeCount++;
        return;
      }
      
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            this.nodeCount++;
            return;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            this.nodeCount++;
            return;
          }
          current = current.right;
        }
      }
    }

    insertNormal(value) {
      const newNode = new TreeNode(value);
      if (!this.root) {
        this.root = newNode;
        this.nodeCount++;
        return;
      }
      
      const queue = [this.root];
      while (queue.length > 0) {
        const current = queue.shift();
        if (!current.left) {
          current.left = newNode;
          this.nodeCount++;
          return;
        } else {
          queue.push(current.left);
        }
        
        if (!current.right) {
          current.right = newNode;
          this.nodeCount++;
          return;
        } else {
          queue.push(current.right);
        }
      }
    }

    inorder(node = this.root, result = []) {
      if (node) {
        this.inorder(node.left, result);
        result.push(node.value);
        this.inorder(node.right, result);
      }
      return result;
    }

    preorder(node = this.root, result = []) {
      if (node) {
        result.push(node.value);
        this.preorder(node.left, result);
        this.preorder(node.right, result);
      }
      return result;
    }

    postorder(node = this.root, result = []) {
      if (node) {
        this.postorder(node.left, result);
        this.postorder(node.right, result);
        result.push(node.value);
      }
      return result;
    }

    toD3Hierarchy() {
      if (!this.root) return null;
      
      function convert(node) {
        if (!node) return null;
        const obj = { name: String(node.value), children: [] };
        if (node.left) obj.children.push(convert(node.left));
        if (node.right) obj.children.push(convert(node.right));
        return obj;
      }
      
      return convert(this.root);
    }

    clear() {
      this.root = null;
      this.nodeCount = 0;
    }
  }

  let tree = new BinaryTree();
  let treeType = 'bst';
  let currentSvg = null;

  function render(svg) {
    const width = svg.node().clientWidth || 800;
    const height = 500;
    svg.attr('width', '100%').attr('height', height);
    svg.selectAll('*').remove();

    if (!tree.root) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#9ca3af')
        .style('font-size', '16px')
        .text('Tree is empty. Insert some values to visualize.');
      updateNodeCount();
      return;
    }

    const data = tree.toD3Hierarchy();
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const g = svg.append('g').attr('transform', 'translate(50, 50)');

    g.selectAll('path.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y))
      .style('fill', 'none')
      .style('stroke', '#c7cfd6')
      .style('stroke-width', 2);

    const node = g.selectAll('g.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 20)
      .style('fill', '#6366f1')
      .style('stroke', '#4f46e5')
      .style('stroke-width', 2);

    node.append('text')
      .attr('y', 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    updateNodeCount();
  }

  async function animateTraversal(svg, traversalOrder) {
    if (!tree.root) return;

    const width = svg.node().clientWidth || 800;
    const height = 500;
    const data = tree.toD3Hierarchy();
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const nodeMap = {};
    root.descendants().forEach(d => {
      nodeMap[d.data.name] = d;
    });

    svg.selectAll('circle')
      .transition()
      .duration(200)
      .style('fill', '#6366f1');

    for (let i = 0; i < traversalOrder.length; i++) {
      const value = String(traversalOrder[i]);
      const node = nodeMap[value];
      
      if (node) {
        svg.selectAll('g.node')
          .filter(d => d.data.name === value)
          .select('circle')
          .transition()
          .duration(300)
          .style('fill', '#f59e0b')
          .transition()
          .duration(300)
          .style('fill', '#10b981');
        
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }
  }

  function updateNodeCount() {
    const countEl = document.getElementById('node-count');
    if (countEl) countEl.textContent = tree.nodeCount;
  }

  window.AlgoSphereTrees = {
    init: function(svgSel) {
      currentSvg = d3.select(svgSel);
      if (currentSvg.empty()) return;

      render(currentSvg);

      document.getElementById('tree-type')?.addEventListener('change', (e) => {
        treeType = e.target.value;
      });

      document.getElementById('insert-btn')?.addEventListener('click', () => {
        const input = document.getElementById('tree-value');
        const value = parseInt(input.value);
        if (isNaN(value)) {
          alert('Please enter a valid number');
          return;
        }

        if (treeType === 'bst') {
          tree.insertBST(value);
        } else {
          tree.insertNormal(value);
        }

        input.value = '';
        render(currentSvg);
      });

      document.getElementById('random-tree')?.addEventListener('click', () => {
        tree.clear();
        const values = [];
        for (let i = 0; i < 7; i++) {
          values.push(Math.floor(Math.random() * 90) + 10);
        }
        
        values.forEach(v => {
          if (treeType === 'bst') {
            tree.insertBST(v);
          } else {
            tree.insertNormal(v);
          }
        });
        
        render(currentSvg);
      });

      document.getElementById('clear-tree')?.addEventListener('click', () => {
        tree.clear();
        render(currentSvg);
        document.getElementById('traversal-result').innerHTML = 'Ready to traverse';
      });

      document.getElementById('inorder-btn')?.addEventListener('click', async () => {
        const result = tree.inorder();
        document.getElementById('traversal-result').innerHTML = 
          `<strong>Inorder:</strong> ${result.join(' → ')}`;
        await animateTraversal(currentSvg, result);
      });

      document.getElementById('preorder-btn')?.addEventListener('click', async () => {
        const result = tree.preorder();
        document.getElementById('traversal-result').innerHTML = 
          `<strong>Preorder:</strong> ${result.join(' → ')}`;
        await animateTraversal(currentSvg, result);
      });

      document.getElementById('postorder-btn')?.addEventListener('click', async () => {
        const result = tree.postorder();
        document.getElementById('traversal-result').innerHTML = 
          `<strong>Postorder:</strong> ${result.join(' → ')}`;
        await animateTraversal(currentSvg, result);
      });

      document.getElementById('tree-value')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          document.getElementById('insert-btn').click();
        }
      });
    }
  };
})();

