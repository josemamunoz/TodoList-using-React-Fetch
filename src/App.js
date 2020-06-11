import React, { useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);


  useEffect(() => {

    fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario", {
      method: "PUT",
      body: JSON.stringify(
        todos.map((label) => {
          return { label: label, done: false };
        })
      ),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    
    }, [todos]);

  
  /* function getTheList () {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario"
    )
    .then(resp => {
      console.log(resp.ok);
      return resp.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  } */
  

  
    
    function clearAll() {    
      fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario", 
        {
          method:"DELETE", 
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            console.log(resp)
            return resp.json()
          })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          });

    }

  function handleNewTodoChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value); 
  }

  
   function handleNewTodo(e) {

    e.preventDefault();
    if (newTodo === "") 
    return 
    setTodos([...todos, { id: Date.now(), text: newTodo},]);
    //setTodos(todos.concat(newTodo)); //otra forma de obtener los todos

    setNewTodo("");
    e.target.reset();
  
  }

  //funcion que elimina las tareas
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h1 className="titulo col-12">Todo</h1>
        <div className="col-4 ">
        </div>
        <div className="col-4 ">
          <form onSubmit={handleNewTodo}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder={
                todos.length === 0
                  ? "No task, rest day!!"
                  : "What needs to be done"
              }
              onChange={handleNewTodoChange}
            ></input>
            <ul className="list-group" >
              {todos.map((todo) => (
                <li className="list-group-item p-1" key={todo.id}>
                  {todo.text}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="col border mb-5">
              <small className="text-white">{todos.length} items left</small>
            </div>
          </form>
        </div>
        <div className="col-4 ">
          <div className="col ">
            <div className="col ">
              <button type="button" className="btn btn-info btn-sm btn-block mb-2" onClick={clearAll}>Clean all tasks</button>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}


export default App;
