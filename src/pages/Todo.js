import { Outlet, useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import Filter from '../components/Filter';
import useTodo from '../hooks/useTodo';

export default function TodoPage() {
    const { tasks, setTasks } = useTodo(); 
    let data = useLoaderData();

    if(tasks.length === 0){
        setTasks(data);
    }
        
    return (
        <div>
            <div className="main-container">
                <AddTask></AddTask>
                <TaskList></TaskList>
                <Filter></Filter>
            </div>
            <div id="task-detail">
                <Outlet />
            </div>
        </div>
    );
}