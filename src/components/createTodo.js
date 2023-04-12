import { useState } from "react";
import styled from "styled-components";

const AddTodo = styled.div`
  display: flex;
  padding: 10px;

  border-bottom: 1px solid #577d86;
  input {
    background-color: white;
    border: 1.5px solid #577d86;
    border-radius: 5px;
    height: 2.5rem;
    width: 80%;
    font-size: 16px;
    padding: 8px;
    :focus {
      outline: none;
      border-color: #f2d7d9;
    }
  }
  button {
    margin-left: auto;
    font-size: 16px;
    color: white;
    background-color: #748da6;
    border: 0.5px solid #748da6;
    border-radius: 7px;
    width: 2.5rem;
    height: 2rem;
  }
`;

function CreateTodo({ onCreateTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const onChange = (e) => {
    setNewTodo(e.target.value);
  };
  const addTodo = () => {
    if (newTodo === "") {
      alert("To-Do를 입력해주세요");
    } else {
      onCreateTodo(newTodo);
      setNewTodo("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };
  return (
    <AddTodo>
      <input
        data-testid="new-todo-input"
        type="text"
        placeholder="Todo를 입력하세요"
        value={newTodo}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
    </AddTodo>
  );
}
export default CreateTodo;
