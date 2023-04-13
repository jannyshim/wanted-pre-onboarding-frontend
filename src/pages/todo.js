import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { axiosAuthInstance } from "../api/API";
import TodoList from "../components/todoList";
import CreateTodo from "../components/createTodo";
import { useNavigate } from "react-router-dom";

const Headers = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  flex: 1;
  font-size: 1.7em;
  text-align: center;
  margin-bottom: 20px;
  color: #1a5f7a;
`;
const LogoutButton = styled.button`
  font-size: 14px;
  color: white;
  background-color: #748da6;
  border: 0.5px solid #748da6;
  border-radius: 7px;
  width: 4rem;
  height: 2rem;
`;

function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      alert("로그인을 먼저해주세요");
      navigate("/");
    } else {
      getTodo();
    }
  }, [navigate, token]);

  // 로그아웃- 로컬스토리지에 토큰만 삭제
  const handleSignOut = () => {
    const confirmed = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmed) {
      localStorage.removeItem("access_token");
      navigate("/");
      window.location.reload();
    }
  };

  // todo 가져오기
  const getTodo = async () => {
    try {
      const response = await axiosAuthInstance.get("/todos");
      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 새글 추가
  const createTodo = async (text) => {
    try {
      const response = await axiosAuthInstance.post("/todos", {
        todo: text,
      });
      if (response.status === 201) {
        setTodos((todos) => [...todos, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 삭제
  const deleteTodo = async (id) => {
    try {
      const response = await axiosAuthInstance.delete(`todos/${id}`);
      if (response.status === 204) {
        getTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = (id, todo, isCompleted) => {
    axiosAuthInstance
      .put(`todos/${id}`, { todo, isCompleted })
      .then((response) => {
        if (response.status === 200) {
          getTodo();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="todo">
      <Headers>
        <Title>오늘의 TODO</Title>
        <LogoutButton onClick={handleSignOut}>로그아웃</LogoutButton>
      </Headers>
      <CreateTodo onCreateTodo={createTodo}></CreateTodo>
      <TodoList
        todos={todos}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
      ></TodoList>
    </div>
  );
}

export default Todo;
