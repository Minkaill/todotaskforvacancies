import React from "react";
import { Todo } from "models";

export interface TodoContextProps {
    todos: Todo[];
    popup: boolean;
    onOpen: () => void;
    todoIdForEdit: Todo["id"] | null;
    changeTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
    addTodo: ({ name, description }: Omit<Todo, "checked" | "id">) => void;
    checkTodo: (id: Todo["id"]) => void;
    deleteTodo: (id: Todo["id"]) => void;
    selectTodoIdForEdit: (id: Todo["id"]) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    popup: false,
    onOpen: () => { },
    todoIdForEdit: null,
    changeTodo: () => { },
    addTodo: () => { },
    checkTodo: () => { },
    deleteTodo: () => { },
    selectTodoIdForEdit: () => { },
})