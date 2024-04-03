import './App.css';
import Todo from './pages/Todo';

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

