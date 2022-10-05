import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

import "./App.css";

import { FaBeer } from "react-icons/fa";
import {FaTrashAlt} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {FaCheck} from 'react-icons/fa'
import useSound from "use-sound";
import sound from "./sounds/click.mp3";
import {Howl} from 'howler';

function App() {
  

  const data = [
    { id: 1, title: "John Doe", completed: false },
    { id: 2, title: "Jack Doe", completed: true },
  ];
  const [todoList, setTodoList] = useState(data);
  const [inputText, setInputText] = useState("");

  function handleChange(e) {
    setInputText(()=>e.target.value);
  }
  function checkExists(input) {
    const result = todoList.find((item) => item.title === input.trim());
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  function addNewTodo() {
    if (!checkExists(inputText)) {
      setTodoList([
        ...todoList,
        { id: todoList.length + 1, title: inputText, completed: false },
      ]);
    } else {
      alert("bu görev zaten var");
      setInputText("");

    }
  }

  const removeCompletedTodos = (e) => {


    let newTodoList = todoList.filter((item) => {
      
    if (item.completed === false) {
        return item;
      
      }
      });

      setTodoList(newTodoList);

  }

  const deleteTodo = idToDelete => setTodoList(
    todoList => todoList.filter(todo => todo.id !== idToDelete))


  const markTodo = (todo) => {
    
    
    setTodoList(
      todoList.map((item) => {
        if (item.id === todo) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );    
  }

  return (
    <div className="App">
      <input type="text" value={inputText} onChange={handleChange} />
      <input type="submit" value="Ekle" onClick={addNewTodo} />
      <input type ="submit" value="Sil" onClick={removeCompletedTodos} />
      <h1>Todo List</h1>

      

      {todoList.map((todo,index) => (
        <div className = "main-container taskfont" >
 <div className = "div-container">
        <div className= {todo.completed ? 'taskdone' : 'tasknotdone'}> 
        <div
        
          onClick={()=>{ markTodo(todo.id) }}
          key={index}
          >
          {todo.title}
      <button onClick={()=>{ deleteTodo(todo.id) }}><FaTrashAlt/></button>

          <span >
          <FaTrashAlt  className="trash-align" />

          <FiEdit className="trash-align" />
          <FaCheck className="trash-align" />
        </span>
      
        </div>

        </div>


</div>
</div>
        
      )
      
      
      )
      }

      
    </div>
  );
}

export default App;
