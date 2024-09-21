import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    
    //useState is a hook that allows to use state in a functional component
    //It returns an array with two elements:
    // 1. The current value of the state
    // 2. A function to update the state
    const [newItem, setNewItem] = useState("")

    
    function handleSubmit(e) {
        //Prevent the default behavior of the form "refreshing the page"
        e.preventDefault()
        //Add the new item to the list of todos
        onSubmit(newItem)
        setNewItem("")
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New ToDo Item</label>
                <input
                    type="text"
                    id="item"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                />
            </div>
            <button className="btn"/*type="submit"*/>Add Item</button>
        </form>
    )
}