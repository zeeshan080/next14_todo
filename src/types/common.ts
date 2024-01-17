import { CheckedState } from "@radix-ui/react-checkbox";

export type Todo = {
  id: number;
  title: string;
  completed: CheckedState;
};
