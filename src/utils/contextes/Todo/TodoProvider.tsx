import React from "react"
import { Todo } from "models"
import { TodoContext } from "utils";

const DEFAULT_TODO_LIST = [
    { id: 1, name: 'task 1', description: 'description 1', checked: false },
    { id: 2, name: 'task 2', description: 'description 2', checked: false },
    {
        id: 3,
        name: 'task 3',
        description:
            'so long task description 3 so long task description so long task description so long task description so long task description',
        checked: true
    }
];

interface TodoProviderProps {
    children: React.ReactNode
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = React.useState<Todo[]>(DEFAULT_TODO_LIST)
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo["id"] | null>(null)
    const [popup, setPopup] = React.useState<boolean>(false)

    const onOpen = () => {
        setPopup((prev) => !prev)
    }

    const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
        const newTodo = {
            id: Math.floor(Math.random() * 100),
            name: name,
            description: description,
            checked: false
        }
        setTodos([...todos, newTodo])
    }

    const deleteTodo = (id: Todo["id"]) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const checkTodo = (id: Todo["id"]) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, checked: !todo.checked }
                }

                return todo
            })
        )
    }

    const selectTodoIdForEdit = (id: Todo["id"]) => {
        setTodoIdForEdit(id)
    }

    const changeTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === todoIdForEdit) {
                    return { ...todo, name, description }
                }
                return todo
            })
        )

        setTodoIdForEdit(null)
    }

    const values = React.useMemo(() => ({
        todos,
        addTodo,
        todoIdForEdit,
        popup,
        onOpen,
        deleteTodo,
        changeTodo,
        selectTodoIdForEdit,
        checkTodo
    }), [todos,
        addTodo,
        todoIdForEdit,
        deleteTodo,
        popup,
        onOpen,
        changeTodo,
        selectTodoIdForEdit,
        checkTodo])

    return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
}