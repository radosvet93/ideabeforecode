import { createFileRoute } from '@tanstack/react-router';
import Header from '@/components/Header';
import { useGetSingleProject } from '@/hooks/project/useGetSingleProject';
import LeadsTable from '@/components/LeadsTable';

export const Route = createFileRoute('/emails/$projectId/')({
  component: EmailRoute,
});

function EmailRoute() {
  const { projectId } = Route.useParams();

  const { data: project } = useGetSingleProject(projectId);

  console.log('{project', project);

  return (
    <div className="min-h-screen">
      <Header hasBackButton />
      <div className="p-4 container mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Generate Emails</h2>
            <p className="text-muted-foreground mt-1">Generate emails with the help of AI</p>
          </div>

          <p>This is where we can have the AI generation, you choose the lead and select the tone of the email and you can click generate</p>
          <p>This will generate an email, with all the information from the project and the lead</p>
          <p>Then you can edit the email and click on send which will send the email, using your provided email</p>

          <hr />

          <LeadsTable leads={project?.leads ?? []} />

        </div>
      </div>
    </div>
  );
}