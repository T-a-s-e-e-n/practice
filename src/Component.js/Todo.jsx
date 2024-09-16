// import React, { useState } from "react";

// function Todo() {
//   const [todos, setTodos] = useState("");
//   const [todosList, setTodosList] = useState([]);

//   const abc = (event) => {
//     setTodos(event.target.value);
//   };
//   const addTodo = () => {
//     if (todos.trim() !== "") {
//       setTodosList([...todosList, todos]);
//       setTodos("");
//     }
//   };
//   return (
//     <div>
//       <h1>TODOS</h1>
//       <input type="text" value={todos} onChange={abc} />
//       <button onClick={addTodo}>Adding...</button>
//       <ul>
//         {todosList.map((todo, index) => (
//           <>
//             <li key={index}>
//               {" "}
//               <input type="checkbox" /> {todo}
//             </li>
//           </>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default Todo;

import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    if (filter === "Completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "Incom") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  const Enter = (e) => {
    if (e.key === "Enter") {
      return addTodo();
    }
  };

  return (
    <div>
      <h1>Enhanced Todos</h1>
      <input
        type="text"
        value={input}
        onKeyDown={Enter}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Incom")}>Incomplete</button>
      </div>

      <ol>
        {filterTodos().map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {todo.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoApp;
