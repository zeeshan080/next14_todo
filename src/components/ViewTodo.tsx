"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, PenBox, Trash2 } from "lucide-react";
import EditDialog from "./EditDialog";
import { Checkbox } from "./ui/checkbox";
import { Todo } from "@/types/common";

type Props = {
  todo: Todo;
};

export default function ViewTodo({ todo }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    console.log("todo deleted ->     ", todo);
  };
  return (
    <Card className="my-2">
      <EditDialog open={open} onToggle={setOpen} editTodo={todo} />
      <CardContent className="flex justify-between items-center p-5">
        <div className="flex gap-2 items-center">
          <Checkbox checked={todo.completed} disabled />
          <div className="py-2">
            <span>{todo.id}. </span>
            <span>{todo.title}</span>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Button variant={"ghost"}>
            <PenBox size={19} onClick={() => setOpen(!open)} />
          </Button>
          <Button variant={"destructive"}>
            <Trash2 size={19} onClick={handleDelete} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
