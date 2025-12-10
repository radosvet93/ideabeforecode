import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/types";

interface ProjectsProps {
  projects: Project[]
}

const Projects = ({ projects }: ProjectsProps) => {

  return (
    <>
      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectForm />

        {projects?.map((project) => (
          <Link
            key={project.id}
            to="/projects/$projectId"
            params={{
              projectId: project.id
            }}
          >
            <ProjectCard id={project.id} />
          </Link>
        ))}

      </div >
    </>
  );
};

export default Projects;