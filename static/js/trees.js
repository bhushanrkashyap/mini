// Simple D3 tree layout sample
(function(){
  window.AlgoSphereTrees = {
    init: function(svgSel){
      const svg = d3.select(svgSel);
      if(svg.empty()) return;
      const width = svg.node().clientWidth || 800; const height = 360;
      svg.attr('width', '100%').attr('height', height).style('height', height + 'px');

      const data = {
        name: '10', children: [
          {name:'6', children:[{name:'3'},{name:'8'}]},
          {name:'15', children:[{name:'12'},{name:'18'}]}
        ]
      };

      const root = d3.hierarchy(data);
      const tree = d3.tree().size([width - 40, height - 80]);
      tree(root);

      svg.selectAll('*').remove();
      const g = svg.append('g').attr('transform','translate(20,40)');
      g.selectAll('line.link').data(root.links()).enter().append('line')
        .attr('class','link').attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y)
        .style('stroke','#c7cfd6');

      const node = g.selectAll('g.node').data(root.descendants()).enter().append('g').attr('class','node').attr('transform',d=>`translate(${d.x},${d.y})`);
      node.append('circle').attr('r',18).style('fill','#6366f1');
      node.append('text').attr('y',6).attr('text-anchor','middle').attr('fill','#fff').text(d=>d.data.name);
    }
  };
})();
