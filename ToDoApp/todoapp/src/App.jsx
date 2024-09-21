//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

//This is the main component of the app
function App() {
  //const [count, setCount] = useState(0)

    return (
        // <> is a fragment, it allows to return multiple elements
        <>
            <form className="new-item-form">
                <div className="form-row">
                    <label htmlFor="new-todo-input">New ToDo Item</label>
                    <input type="text" id="new-todo-input" name="new-todo-input" />
                </div>
                <button className="btn"/*type="submit"*/>Add Item</button>
            </form>
            <h1 className="header">ToDo List</h1>
            <ul className="list">
                <li>
                    <label>
                        <input type="checkbox" />
                        Item 1
                    </label>
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-warning">Edit</button>
                </li>
            </ul>
        </>
      /*
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    */
  )
}

//This is the default export of the file
export default App
