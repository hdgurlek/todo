import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoProvider } from "./contexts/TodoContext.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoPage from './pages/Todo.js';
import { getTasks as loader } from './apis/TodoApi.js';
import Edit from './components/Edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loader,
    children: [
      {
        path: "task/:taskId",
        element: <Edit />,
      }],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </TodoProvider>
  </React.StrictMode >
);