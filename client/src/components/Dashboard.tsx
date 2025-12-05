import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MessageSquare } from "lucide-react";
import Projects from "./projects/Projects";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useGetLeads } from "@/hooks/useGetLeads";
import { useGetEmails } from "@/hooks/useGetEmails";

const Dashboard = () => {
  const { data: leads } = useGetLeads();
  const { data: emails } = useGetEmails();
  const { data: projects, error: errorProject, isLoading: isProjectLoading } = useGetProjects();

  const voidFn = () => {
    console.log('hello');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Manage your outreach campaigns and track leads</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <p className="text-3xl font-bold mt-2">{projects?.length ?? '-'}</p>
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
              <p className="text-3xl font-bold mt-2">{leads?.length ?? '-'}</p>
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
              <p className="text-3xl font-bold mt-2">{emails?.length ?? '-'}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {!errorProject && isProjectLoading ? 'Loading' : (
        <Projects
          projects={projects ?? []}
          onCreateProject={voidFn}
          onSelectProject={voidFn}
          onDeleteProject={voidFn}
        />
      )}
    </div>
  );

};

export default Dashboard;