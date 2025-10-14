import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { toast } from "sonner";

export const MindMapCanvas = ({ data, onNodeClick }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const viewportWidth = container.clientWidth;
    const viewportHeight = container.clientHeight;

    // Use a very large virtual canvas for unlimited size
    const canvasWidth = 10000;
    const canvasHeight = 10000;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", viewportWidth)
      .attr("height", viewportHeight)
      .attr("viewBox", `0 0 ${viewportWidth} ${viewportHeight}`);

    const g = svg.append("g");

    // Setup zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 5])
      .translateExtent([
        [-canvasWidth, -canvasHeight],
        [canvasWidth * 2, canvasHeight * 2],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setTransform(event.transform);
      });

    svg.call(zoom);

    // Center start
    const initialTransform = d3.zoomIdentity.translate(
      viewportWidth / 2,
      viewportHeight / 2
    );
    svg.call(zoom.transform, initialTransform);

    // Prepare data
    const nodeIds = new Set(data.nodes);
    const nodes = Array.from(nodeIds).map((id) => ({ id }));
    const links = (data.edges || [])
      .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
      .map((edge) => ({ source: edge.source, target: edge.target }));

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius(60));

    // Draw links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(0 0% 90%)")
      .attr("stroke-width", 1);

    // Draw nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(
        d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => {
        const nodeData = {
          id: d.id,
          summary: data.summaries[d.id] || "No summary available",
          relatedTopics: data.relatedTopics?.[d.id] || [],
          quiz: data.quizzes?.[d.id],
        };
        onNodeClick(nodeData);
      })
      .style("cursor", "pointer");

    // Node circles
    node
      .append("circle")
      .attr("r", 35)
      .attr("fill", "hsl(0 0% 100%)")
      .attr("stroke", "hsl(0 0% 10%)")
      .attr("stroke-width", 1)
      .on("mouseenter", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill", "hsl(0 0% 96%)");
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill", "hsl(0 0% 100%)");
      });

    // Node labels
    node
      .append("text")
      .text((d) => data.labels?.[d.id] || d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "hsl(0 0% 10%)")
      .attr("font-size", "11px")
      .attr("font-weight", "400")
      .style("pointer-events", "none")
      .each(function (d) {
        const text = d3.select(this);
        const label = data.labels?.[d.id] || d.id;
        const words = label.split(/\s+/);
        text.text("");

        if (words.length > 1) {
          words.forEach((word, i) => {
            text
              .append("tspan")
              .text(word)
              .attr("x", 0)
              .attr("dy", i === 0 ? "-0.3em" : "1em");
          });
        } else {
          text.text(label);
        }
      });

    // Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, onNodeClick]);

  const handleZoomIn = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy, 0.7);
  };

  const handleReset = () => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomIdentity
        .translate(container.clientWidth / 2, container.clientHeight / 2)
        .scale(1)
    );
  };

  const handleDownload = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = svgRef.current.clientWidth;
    canvas.height = svgRef.current.clientHeight;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "mindmap.png";
          link.click();
          URL.revokeObjectURL(url);
          toast.success("Mind map downloaded!");
        }
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">No data yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" ref={containerRef}>
      <svg ref={svgRef} className="w-full h-full bg-background" />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <Button size="icon" variant="ghost" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleReset}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
