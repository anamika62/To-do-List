import "./App.css";
import Header from './MyComponenets/Header';
import { Todos } from "./MyComponenets/Todos";
import { Footer } from "./MyComponenets/Footer";
import { AddTodo } from './MyComponenets/AddTodo';
import { About } from "./MyComponenets/About";
import  { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  
  Route
  } from "react-router-dom";
  import{Switch} from "react-router"


function App() {
  let inittodo;
  if (localStorage.getItem("todos") === null) {
    inittodo = [];
  }
  else {
    inittodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am On delete todo", todo);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.getItem("todos", JSON.stringify(todos));

  }
  const addTodo = (title, desc) => {
    let sno;
    console.log("add Todo", title, desc)
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }
  const [todos, setTodos] = useState(inittodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar = {false} />
       
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }}>

          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Footer/>
      </Router>

    </>
  );
}


export default App;
