import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useGetSingleProject } from "@/hooks/useGetSingleProject";

interface ProjectCardProps {
  id: string
}

const ProjectCard = ({ id }: ProjectCardProps) => {
  const { data: project } = useGetSingleProject(id);

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
              e.stopPropagation();
              // TODO: Delete project from DB
            }}
            className="text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {project?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        )}

        <div className="flex gap-4 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Leads</p>
            <p className="text-lg font-semibold">{project?.leads?.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Emails</p>
            <p className="text-lg font-semibold">
              {project?.emailCount}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;