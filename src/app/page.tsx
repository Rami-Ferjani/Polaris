"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
const x = () => {
  const tasks = useQuery(api.tasks.get);
  console.log(tasks);

  if (tasks === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {tasks?.map((task) => (
        <div className="border rounded p-2 flex flex-col" key={task._id}>
          <p>{task.text}</p>
          <p>Is completed: {task.isCompleted ? "Yes" : "No"}</p>
        </div>
      ))}
      <Button>Click me</Button>
    </div>
  );
};

export default x;
