import React, { useState } from "react";
import styled from "styled-components";

const TodoList = styled.ul`
  list-style-type: none;
  padding: 10px;
  border-bottom: 1px solid #577d86;
  max-width: 800px;
  min-width: 300px;

  li {
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      border: 1.5px solid #577d86;
      border-radius: 5px;
      padding: 10px;
      margin: 4px 20px 4px 10px;
      :focus {
        outline: none;
        border-color: #9cb4cc;
      }
    }
    button {
      color: white;
      font-size: 16px;
      background-color: #9cb4cc;
      border: 0.5px solid #9cb4cc;
      border-radius: 5px;
      width: 2.5rem;
      height: 2rem;
      margin-left: auto;
    }
    button + button {
      margin-left: 10px;
    }
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #577d86;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
  }
  input[type="checkbox"]:checked {
    background-color: #577d86;
  }
  span {
    font-size: 16px;
    background-color: #f2d7d9;
    border-radius: 18px;
    padding: 10px;
    margin: 5px 20px 5px 10px;
  }
  .todo-value {
    text-decoration: ${({ completed }) =>
      completed ? "line-through" : "none"};
    opacity: ${({ completed }) => (completed ? 0.5 : 1)};
  }
`;

function TodoListItem({ todo, onUpdateTodo, onDeleteTodo }) {
  const [value, setValue] = useState(todo.todo);
  const [editingId, setEditingId] = useState("");
  const [completed, setCompleted] = useState(todo.isCompleted);
  const id = todo.id;

  const updateMode = () => {
    setEditingId(id);
  };
  const deleteMode = () => {
    onDeleteTodo(id);
  };

  const updateComplete = () => {
    if (value === "") {
      alert("수정할 To-do를 입력하세요");
    } else {
      onUpdateTodo(id, value, completed);
      setEditingId("");
    }
  };
  const updateCancel = () => {
    setValue(todo.todo);
    setCompleted(todo.isCompleted);
    setEditingId("");
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const isChecked = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <TodoList>
      <li key={todo.id}>
        {editingId === todo.id ? (
          // 수정 중인 todo인 경우
          <React.Fragment>
            <StyledLabel completed={completed} htmlFor={`isChecked${id}`}>
              <input
                type="checkbox"
                id={`isChecked${id}`}
                checked={completed}
                onChange={isChecked}
              />
            </StyledLabel>
            <input
              className="input-box"
              value={value}
              data-testid="modify-input"
              onChange={onChange}
            />
            <button data-testid="submit-button" onClick={updateComplete}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={updateCancel}>
              취소
            </button>
          </React.Fragment>
        ) : (
          // 수정 중이 아닌 todo인 경우
          <React.Fragment>
            <StyledLabel completed={completed} htmlFor={`isChecked${id}`}>
              <input
                type="checkbox"
                id={`isChecked${id}`}
                checked={completed}
                onChange={isChecked}
              />
              <span className="todo-value">{value}</span>
            </StyledLabel>
            <button data-testid="modify-button" onClick={updateMode}>
              수정
            </button>
            <button data-testid="delete-button" onClick={deleteMode}>
              삭제
            </button>
          </React.Fragment>
        )}
      </li>
    </TodoList>
  );
}

export default TodoListItem;
