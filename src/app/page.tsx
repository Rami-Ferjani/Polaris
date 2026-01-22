"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
const x = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  console.log(projects);

  if (projects === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button onClick={() => createProject({ name: "New Project" })}></Button>
      {projects?.map((project) => (
        <div className="border rounded p-2 flex flex-col" key={project._id}>
          <p>{project.name}</p>
          <p>Owner Id: {`${project.ownerId}`}</p>
        </div>
      ))}
      <Button>Click me</Button>
    </div>
  );
};

export default x;
