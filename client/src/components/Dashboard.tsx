import { useGetProjects } from "@/hooks/project/useGetProjects";
import { useGetLeads } from "@/hooks/lead/useGetLeads";
import { useGetEmails } from "@/hooks/email/useGetEmails";
import Projects from "./Projects/Projects";
import { AnalyticsCardForDashboard } from "./AnalyticsCardForDashboard";

const Dashboard = () => {
  const { data: leads } = useGetLeads();
  const { data: emails } = useGetEmails();
  const { data: projects } = useGetProjects();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Manage your outreach campaigns and track leads</p>
      </div>

      <AnalyticsCardForDashboard
        projectsCount={projects?.length ?? '-'}
        leadsCount={leads?.length ?? '-'}
        emailsCount={emails?.length ?? '-'}
      />

      <Projects projects={projects ?? []} />

    </div>
  );

};

export default Dashboard;