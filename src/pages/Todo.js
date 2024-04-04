import { Outlet, useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import Filter from '../components/Filter';
import useTodo from '../hooks/useTodo';
import { useEffect } from 'react';

export default function TodoPage() {

    const { setTasks } = useTodo();
    const data = useLoaderData();
    useEffect(() => {
        setTasks(data);
    }, [data])

    return (
        <div>
            <div className="todo-main-container">
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