import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const NodeDetailPanel = ({ node, onClose }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!node) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-background border-l border-border z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-medium">{node.id}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Summary Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {node.summary}
            </p>
          </div>

          {/* Related Topics */}
          {node.relatedTopics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Related Topics</h4>
              <div className="flex flex-wrap gap-2">
                {node.relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-xs bg-secondary"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {node.quiz && (
            <div className="space-y-3 pt-3 border-t">
              <h4 className="text-sm font-medium">Quiz</h4>
              <p className="text-sm">{node.quiz.question}</p>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full"
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>

              {showAnswer && (
                <p className="text-sm text-muted-foreground">
                  {node.quiz.answer}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
