import './App.css';
import Todo from './pages/Todo';
import useTodo from './hooks/useTodo';
import { useLoaderData } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <header className='header'>
        Todo List
      </header>
      <div className="main-container">
        <Todo />
      </div>
    </div>
  );

}

export default App;

