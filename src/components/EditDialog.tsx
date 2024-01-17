"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Todo } from "@/types/common";

type Props = {
  open: boolean;
  onToggle: (open: boolean) => void;
  editTodo: Todo;
};

export default function EditDialog({ open, onToggle, editTodo }: Props) {
  const [title, setTitle] = React.useState<string>(editTodo.title); // Set the initial value of title to editTodo.title
  const [complete, setComplete] = React.useState<CheckedState>(
    editTodo.completed
  );

  const onSubmit = () => {
    editTodo.title = title;
    editTodo.completed = complete;
    console.log("todo updated ->     ", editTodo);
  };

  return (
    <Dialog open={open} onOpenChange={() => onToggle(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="">
          <Input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="flex items-center gap-2 ml-1">
          <Label htmlFor="complete">Completed</Label>
          <Checkbox
            checked={complete}
            id="complete"
            onCheckedChange={(value) => setComplete(value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>
            <PenBox size={16} className="mr-1" /> Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
