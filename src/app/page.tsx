import AddTodo from "@/components/AddTodo";
import ViewTodo from "@/components/ViewTodo";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const todos = [
  {
    id: 1,
    title: "This is todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "This is todo 2",
    completed: true,
  },
  {
    id: 3,
    title: "This is todo 3",
    completed: false,
  },

];

export default function Home() {
  return (
    <main className={`${jost.className} w-screen`}>
      <section className="flex flex-col justify-center items-center mt-16">
        <div className="text-center font-semibold">
          <h1 className="text-[28px]">Nextjs14 + FastAPI - Todo APP</h1>
        </div>
        <div className="w-[50%] my-6">
          <AddTodo />
          <div className="py-4">
            {todos.map((todo) => (
              <ViewTodo key={todo.id} todo={todo}/>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
