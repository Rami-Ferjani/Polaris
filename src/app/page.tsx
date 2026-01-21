"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
const x = () => {
  const projects = useQuery(api.projects.get);
  console.log(projects);

  if (projects === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {projects?.map((project) => (
        <div className="border rounded p-2 flex flex-col" key={project._id}>
          <p>{project.text}</p>
          <p>Is completed: {project.isCompleted ? "Yes" : "No"}</p>
        </div>
      ))}
      <Button>Click me</Button>
    </div>
  );
};

export default x;
