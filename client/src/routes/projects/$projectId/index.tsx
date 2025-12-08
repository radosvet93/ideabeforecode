import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { DragAndDrop } from '@/components/DragAndDrop';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { AnalyticsCardForProject } from '@/components/projects/AnalyticsCardForProject';
import { useGetSingleProject } from '@/hooks/useGetSingleProject';
import { useUpdateLeadStatus } from '@/hooks/useUpdatedLeadStatus';
import type { Lead } from '@/types';

export const Route = createFileRoute('/projects/$projectId/')({
  component: Project,
});

function Project() {
  const { projectId } = Route.useParams();

  const { data: project, isLoading } = useGetSingleProject(projectId);

  const updateLeadStatus = useUpdateLeadStatus();

  if (isLoading || !project) return <div>Loading…</div>;

  const { name, description, emailCount, leads } = project;

  const handleUpdateLead = (id: string, status: Lead['status']) => {
    // optimistic update directly in query cache
    updateLeadStatus.mutate({ id, status });
  };

  return (
    <div className="min-h-screen">
      <Header hasBackButton />
      <div className="p-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>

          {/* Analytics cards */}
          <AnalyticsCardForProject leads={leads} emailCount={emailCount} />

          <div className='flex justify-between'>
            <div>
              <h3 className="text-2xl font-bold">Outreach Pipeline</h3>
              <p className='text-muted-foreground mt-1'>Drag leads between stages to track progress</p>
            </div>

            <Button><Plus />Add Lead</Button>
          </div>

          {/* DnD Pipeline */}
          <DragAndDrop leads={leads} onUpdateLead={handleUpdateLead} />

        </div>
      </div>
    </div>
  );
}