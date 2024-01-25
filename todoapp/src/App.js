import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import './App.css';



function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    setTodos(updatedTodo)
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index)
    setTodos(reducedTodo)
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;
    let filteredtodo = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompleteTodoArr = [...completedTodos];
    updatedCompleteTodoArr.push(filteredtodo);
    setCompletedTodos(updatedCompleteTodoArr);
    handleDeleteTodo(index)
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder='Task Header?' />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder='Task Description?' />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primarybtn">Submit</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondarybtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>To Do</button>
          <button className={`secondarybtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <MdDelete className='delete-icon' onClick={() => handleDeleteTodo(index)} />
                  <FaCircleCheck className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On: {item.completedOn}</small></p>
                </div>
                <div>
                  <MdDelete className='delete-icon' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
