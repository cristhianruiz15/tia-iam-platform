'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export const RoleMappingD3 = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;

    const nodes: Node[] = [
      { id: 'Gerente Tienda', group: 1 },
      { id: 'Cajero', group: 1 },
      { id: 'Analista IT', group: 1 },
      { id: 'SGR', group: 2 },
      { id: 'Keycloak', group: 2 },
      { id: 'SIM', group: 2 },
      { id: 'manager_retail', group: 3 },
      { id: 'pos_operator', group: 3 },
      { id: 'it_support', group: 3 },
    ];

    const links: Link[] = [
      { source: 'Gerente Tienda', target: 'SGR', value: 1 },
      { source: 'SGR', target: 'manager_retail', value: 1 },
      { source: 'Cajero', target: 'SGR', value: 1 },
      { source: 'SGR', target: 'pos_operator', value: 1 },
      { source: 'Analista IT', target: 'Keycloak', value: 1 },
      { source: 'Keycloak', target: 'it_support', value: 1 },
    ];

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d) => {
        if (d.group === 1) return '#E30613';
        if (d.group === 2) return '#1e293b';
        return '#64748b';
      })
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    node.append('title')
      .text((d) => d.id);

    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text((d) => d.id)
      .style('font-size', '10px')
      .style('font-family', 'sans-serif')
      .style('fill', '#334155');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      svg.selectAll('text')
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-[400px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};
