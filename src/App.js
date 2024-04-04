import './App.css';
import Todo from './pages/Todo';

function App() {

  return (
    <div className='app'>
      <h1 className='app-header'>
        Todo List
      </h1>
      <div className="app-main-container">
        <Todo />
      </div>
    </div>
  );

}

export default App;

