import { useState } from "react";
import type { Lead } from "@/types";
import { useDeleteLead } from "@/hooks/lead/useDeleteLead";
import { useUpdateLeadStatus } from '@/hooks/lead/useUpdatedLeadStatus';
import LeadsColumn from "./LeadsColumn";

const PIPELINE_STAGES = [
  { id: "new", label: "New", color: "border-slate-200" },
  { id: "contacted", label: "Contacted", color: "border-blue-200" },
  { id: "interested", label: "Interested", color: "border-purple-200" },
  { id: "closed", label: "Closed", color: "border-green-200" },
  { id: "declined", label: "Declined", color: "border-red-200" },
] as const;

interface LeadsPipelineProps {
  leads: Lead[],
}

export function LeadsPipeline({ leads }: LeadsPipelineProps) {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const { mutate: deleteLead } = useDeleteLead();
  const { mutate: updateLeadStatus } = useUpdateLeadStatus();

  const leadsByStatus = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    leads: leads.filter((lead) => lead.status === stage.id),
  }));

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    e.preventDefault();
    if (draggedLead) {
      updateLeadStatus({ id: draggedLead.id, status });
      setDraggedLead(null);
    }
  };

  const handleDeleteLead = (id: string, projectId: string) => {
    deleteLead({ id, projectId });
  };

  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-4 min-w-max">
        {leadsByStatus.map((column) => (
          <LeadsColumn
            key={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDelete={handleDeleteLead}
          />
        ))}
      </div>
    </div>
  );
}
