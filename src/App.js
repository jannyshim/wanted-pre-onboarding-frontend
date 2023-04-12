import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Todo from "./pages/todo";
import GlobalStyle from "../src/assets/global-styles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
