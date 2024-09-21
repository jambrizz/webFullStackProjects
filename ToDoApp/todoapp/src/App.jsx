import { useEffect, useState } from 'react'
import { NewTodoForm } from './NewTodoForm'
import './App.css'
import { TodoList } from './TodoList'


//This is the main component of the app
function App() {

    //useState will be used to store the list of todos
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])

    function addTodo(title) {
        setTodos((currentTodos) => {
            return [
                ...currentTodos,
                {
                    id: crypto.randomUUID(),
                    title,
                    completed: false
                },
            ]
        })
    }

    function toggleTodo(id, completed) {
        setTodos((currentTodos) => {
            return currentTodos.map(todo => {
                //If the todo id is the same as the id passed to the function
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed
                    }
                }
                //Otherwise, return the todo as is
                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos((currentTodos) => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return (
        // <> is a fragment, it allows to return multiple elements
        <>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">ToDo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
      
  )
}

//This is the default export of the file
export default App
