import { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { MindMapCanvas } from "@/components/MindMapCanvas";
import { NodeDetailPanel } from "@/components/NodeDetailPanel";
import { Brain } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [mindMapData, setMindMapData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // AI processing function using Supabase Edge Function
  const generateMindMap = async (inputText) => {
    setIsLoading(true);
    setSelectedNode(null);
    toast.info("AI is analyzing your text...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-mindmap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate mind map");
      }

      const mindmapData = await response.json();

      // Build consistent dataset: unique node IDs and valid edges
      const idSet = new Set(mindmapData.nodes.map((n) => n.id));
      const filteredEdges = (mindmapData.edges || []).filter(
        (e) => idSet.has(e.source) && idSet.has(e.target)
      );

      // Convert backend format to frontend format
      const data = {
        nodes: Array.from(idSet),
        edges: filteredEdges,
        summaries: mindmapData.nodes.reduce((acc, n) => {
          acc[n.id] = n.summary;
          return acc;
        }, {}),
        relatedTopics: mindmapData.nodes.reduce((acc, n) => {
          acc[n.id] = n.relatedTopics;
          return acc;
        }, {}),
        quizzes: mindmapData.nodes.reduce((acc, n) => {
          acc[n.id] = n.quiz;
          return acc;
        }, {}),
        labels: mindmapData.nodes.reduce((acc, n) => {
          acc[n.id] = n.label;
          return acc;
        }, {}),
      };

      setMindMapData(data);
      toast.success("Mind map generated successfully!");
    } catch (error) {
      console.error("Error generating mind map:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate mind map"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <Brain className="w-5 h-5" />
            MindMapAI
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Input */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
          <InputPanel onGenerate={generateMindMap} isLoading={isLoading} />
        </div>

        {/* Right Panel - Visualization */}
        <div className="flex-1 relative overflow-hidden">
          <MindMapCanvas data={mindMapData} onNodeClick={setSelectedNode} />

          {/* Node Detail Panel */}
          {selectedNode && (
            <NodeDetailPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          MindMapAI
        </div>
      </footer>
    </div>
  );
};

export default Index;
