import { formatDistanceToNow } from "date-fns";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import type { Project } from "./Projects";

const ProjectCard = ({ id, name, description, createdAt }: Project) => {
  return (
    <Card
      key={id}
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
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

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        <div className="flex gap-4 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Leads</p>
            <p className="text-lg font-semibold">0</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Emails</p>
            <p className="text-lg font-semibold">
              0
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;