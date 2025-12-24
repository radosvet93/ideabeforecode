import { createFileRoute, Link } from '@tanstack/react-router';
import { LeadsPipeline } from '@/components/Leads/LeadsPipeline';
import Header from '@/components/Header';
import { AnalyticsCardForProject } from '@/components/Projects/AnalyticsCardForProject';

import { useGetSingleProject } from '@/hooks/project/useGetSingleProject';
import { CreateLeadForm } from '@/components/Leads/CreateLeadForm';
import { Button } from '@/components/ui/button';
import { Import, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRef, type ChangeEvent } from 'react';
import { useUploadLeads } from '@/hooks/lead/useUploadLeads';

export const Route = createFileRoute('/projects/$projectId/')({
  component: ProjectRoute,
});

function ProjectRoute() {
  const { projectId } = Route.useParams();

  const { data: project, isLoading } = useGetSingleProject(projectId);

  const { mutate: uploadLeads } = useUploadLeads();

  const importLeadsRef = useRef<HTMLInputElement | null>(null);

  if (isLoading || !project) return <div>Loading…</div>;

  const { name, description, emailCount, leads } = project;

  const handleImportLeadsClick = () => {
    importLeadsRef?.current?.click();
  };

  const handleImportLeads = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadLeads({ file, projectId });
    e.target.value = '';
  };

  return (
    <div className="min-h-screen">
      <Header hasBackButton />
      <div className="p-4 container mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>

          <AnalyticsCardForProject leads={leads} emailCount={emailCount} />

          <div className='flex justify-between'>
            <div>
              <h3 className="text-2xl font-bold">Outreach Pipeline</h3>
              <p className='text-muted-foreground mt-1'>Drag leads between stages to track progress</p>
            </div>

            <div className='space-x-2'>
              <Button onClick={handleImportLeadsClick}><Import />
                Import Leads
              </Button>
              <Input onChange={handleImportLeads} ref={importLeadsRef} id="importLeads" type="file" className='hidden' accept=".csv" />
              <CreateLeadForm projectId={projectId} />
              <Link
                key={project.id}
                to="/emails/$projectId"
                params={{
                  projectId: project.id
                }}
              >
                <Button variant={'outline'}><Mail />Generate Email</Button>
              </Link>
            </div>
          </div>

          <LeadsPipeline leads={leads} />

        </div>
      </div>
    </div>
  );
}