import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useGetSingleProject } from "@/hooks/useGetSingleProject";
import { useDeleteProject } from "@/hooks/useDeleteProject";

interface ProjectCardProps {
  id: string
}

const ProjectCard = ({ id }: ProjectCardProps) => {
  const { data: project } = useGetSingleProject(id);
  const { mutate: deleteProject } = useDeleteProject();

  const closedLeads = project?.leads.filter(lead => lead.status === 'closed').length;

  return (
    <Card
      key={id}
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{project?.name}</h3>
            {project?.createdAt && (
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();

              deleteProject(id);
            }}
            className="text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{project?.description}</p>

        <div className="flex justify-between pt-2 border-t border-border">
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Leads</p>
            <p className="text-lg m-0 font-semibold">{project?.leads?.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Emails</p>
            <p className="text-lg m-0 font-semibold">
              {project?.emailCount}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Closed Leads</p>
            <p className="text-lg m-0 font-semibold">
              {closedLeads}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;