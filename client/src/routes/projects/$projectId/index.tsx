import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/$projectId/')({
  component: Project,
});

function Project() {
  const { projectId } = Route.useParams();
  return <div>Project ID: {projectId}</div>;
}