import { useState } from "react";
import { Card } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";
import { Link } from "@tanstack/react-router";

export interface Project {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

interface ProjectsProps {
  projects: Project[],
  onCreateProject: (name: string, description: string) => void,
  onSelectProject: (id: string) => void,
  onDeleteProject: (id: string) => void,
}

const Projects = ({ projects, onCreateProject }: ProjectsProps) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      {isCreating && <ProjectForm onCreateProject={onCreateProject} setIsCreating={setIsCreating} />}

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Project Card */}
        {!isCreating && (
          <Card
            className="p-6 flex flex-col items-center justify-center min-h-40 cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="font-semibold text-center">New Project</p>
            <p className="text-xs text-muted-foreground text-center mt-1">Start a new outreach campaign</p>
          </Card>
        )}

        {projects?.map((project) => (
          <Link
            key={project.id}
            to="/projects/$projectId"
            params={{
              projectId: project.id
            }}
          >
            <ProjectCard
              id={project.id}
              name={project.name}
              description={project.description}
              createdAt={project.createdAt}
            >
            </ProjectCard>
          </Link>
        ))}

      </div >

      {
        projects?.length === 0 && !isCreating && (
          <Card className="py-16 px-4 text-center">
            <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Create your first project to start tracking outreach</p>
            <Button onClick={() => setIsCreating(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Button>
          </Card>
        )
      }
    </>
  );
};

export default Projects;