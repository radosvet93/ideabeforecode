import Header from '@/components/Header';
import type { Project } from '@/components/projects/Projects';
import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { MessageSquare, TrendingUp, Users } from 'lucide-react';

interface SingleProject extends Project {
  leads: {
    id: string,
    name: string,
    createdAt: Date
  }[]
}
const fetchProject = async (id: string) => {
  const response = await fetch(`/api/projects/${id}`);
  const singleProject = await response.json() as SingleProject;

  return singleProject;
};

export const Route = createFileRoute('/projects/$projectId/')({
  loader: ({ params: { projectId } }) => fetchProject(projectId),
  component: Project,
});

function Project() {
  const data = Route.useLoaderData();

  console.log('data', data);
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
      <Header hasBackButton />
      <div className="p-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <p className="text-muted-foreground mt-1">{data.description}</p>
          </div>

          {/* Analytics Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-3xl font-bold mt-2">{'-'}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold mt-2">{data.leads.length ?? '-'}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Emails Sent</p>
                  <p className="text-3xl font-bold mt-2">{'-'}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}