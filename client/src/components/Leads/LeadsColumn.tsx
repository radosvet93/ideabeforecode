import type { Lead } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { GripVertical, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface LeadsColumnProps {
  column: {
    id: Lead['status']
    label: string
    color: string
    leads: Lead[]
  }
  onDragStart: (e: React.DragEvent, lead: Lead) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, status: Lead['status']) => void
  onDelete: (id: string, projectId: string) => void
}

const LeadsColumn = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
}: LeadsColumnProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualiser = useVirtualizer({
    count: column.leads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 2,
    gap: 10
  });

  return (
    <div
      className="p-4 rounded-2xl flex-1 w-64 bg-slate-50"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          {column.label}
          <Badge variant="secondary">{column.leads.length}</Badge>
        </h3>
      </div>

      <div
        ref={parentRef}
        className="relative h-[600px] overflow-y-auto pr-2"
      >
        <div
          style={{
            height: rowVirtualiser.getTotalSize(),
            position: 'relative',
          }}
        >
          {rowVirtualiser.getVirtualItems().map((virtualRow) => {
            const lead = column.leads[virtualRow.index];

            return (
              <div
                key={lead.id}
                className="pb-3 absolute top-0 left-0 w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Card
                  draggable
                  onDragStart={(e) => onDragStart(e, lead)}
                  className={`p-2 cursor-move hover:shadow-lg transition-shadow border-l-4 ${column.color}`}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground mt-1" />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <h4 title={lead.name} className="font-medium line-clamp-1">{lead.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {lead.notes}
                        </p>
                        <p className="text-xs italic text-muted-foreground">
                          {lead.jobTitle} at {lead.company}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(lead.id, lead.projectId)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {column.leads.length === 0 && (
          <div className="h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground text-sm">
            Drop leads here
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsColumn;