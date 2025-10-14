import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const InputPanel = ({ onGenerate, isLoading }) => {
  const [inputText, setInputText] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result;
          setInputText(text);
          toast.success("File uploaded successfully!");
        };
        reader.readAsText(file);
      } else {
        toast.error("Please upload a .txt file");
      }
    }
  };

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text or upload a file");
      return;
    }
    onGenerate(inputText);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-medium">Input</h2>
        <p className="text-sm text-muted-foreground">
          Enter text or upload a file
        </p>
      </div>

      {/* Upload Button */}
      <Card className="border border-dashed">
        <label className="flex flex-col items-center justify-center p-5 cursor-pointer">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          <Upload className="h-5 w-5 text-muted-foreground mb-2" />
          <p className="text-sm text-foreground">Upload .txt file</p>
        </label>
      </Card>

      {/* Text Input */}
      <div className="flex-1 flex flex-col space-y-2">
        <label className="text-sm font-medium">Text</label>
        <Textarea
          placeholder="Enter your text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 min-h-[200px] resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isLoading || !inputText.trim()}
        className="w-full"
      >
        {isLoading ? "Generating..." : "Generate"}
      </Button>

      {/* Example Link */}
      <button
        onClick={() =>
          setInputText(
            "Artificial Intelligence is a broad field encompassing Machine Learning, Natural Language Processing, and Computer Vision. Machine Learning focuses on algorithms that learn from data, including Deep Learning with Neural Networks. Natural Language Processing enables computers to understand human language. Computer Vision allows machines to interpret visual information."
          )
        }
        className="text-xs text-muted-foreground hover:text-foreground text-center"
        disabled={isLoading}
      >
        Try example
      </button>
    </div>
  );
};
