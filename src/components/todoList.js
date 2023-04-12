import TodoListItem from "./todoListItem";

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  const sortedTodos = todos.slice().sort((a, b) => b.id - a.id);
  return (
    <div>
      {sortedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
          key={todo.id}
        />
      ))}
    </div>
  );
}

export default TodoList;
