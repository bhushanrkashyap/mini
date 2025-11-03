// Simple d3 force-directed graph example
(function(){
  window.AlgoSphereGraphs = {
    init: function(svgSel){
      const svg = d3.select(svgSel);
      if(svg.empty()) return;
      const width = svg.node().clientWidth || 800; const height = 360;
      svg.attr('width','100%').attr('height',height).style('height',height+'px');

      const nodes = [ {id:1},{id:2},{id:3},{id:4},{id:5} ];
      const links = [ {source:1,target:2},{source:2,target:3},{source:2,target:4},{source:1,target:5} ];

      const sim = d3.forceSimulation(nodes).force('link', d3.forceLink(links).id(d=>d.id).distance(80)).force('charge', d3.forceManyBody().strength(-200)).force('center', d3.forceCenter((width)/2, height/2));

      svg.selectAll('*').remove();
      const link = svg.append('g').attr('stroke','#9ca3af').selectAll('line').data(links).enter().append('line').attr('stroke-width',2);
      const node = svg.append('g').selectAll('g').data(nodes).enter().append('g');
      node.append('circle').attr('r',14).attr('fill','#4f46e5');
      node.append('text').attr('fill','#fff').attr('text-anchor','middle').attr('y',4).text(d=>d.id);

      sim.on('tick', ()=>{
        link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
        node.attr('transform',d=>`translate(${d.x},${d.y})`);
      });
    }
  };
})();
