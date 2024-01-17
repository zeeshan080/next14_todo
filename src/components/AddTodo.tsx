"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type Props = {};

export default function AddTodo({}: Props) {
  const [todo, setTodo] = React.useState("");
  const onSubmit = () => {
    console.log("todo->     ", todo);
  };
  return (
    <div className="flex gap-2 items-center">
      <Input
        placeholder="What is to be done?"
        className="h-11"
        onChange={(e) => setTodo(e.currentTarget.value)}
      />
      <Button className="h-11 w-24">
        <Plus size={16} onClick={onSubmit} className="mr-1" /> ADD
      </Button>
    </div>
  );
}
