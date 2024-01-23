"use client";
import React, { FormEventHandler } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type Props = {};

export default function AddTodo({}: Props) {
  const [todo, setTodo] = React.useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("todo->     ", todo);
  };
  return (
    <form className="flex gap-2 items-center" onSubmit={onSubmit}>
      <Input
        placeholder="What is to be done?"
        className="h-11"
        onChange={(e) => setTodo(e.currentTarget.value)}
      />
      <Button className="h-11 w-24">
        <Plus size={16} type="submit" className="mr-1" /> ADD
      </Button>
    </form>
  );
}
