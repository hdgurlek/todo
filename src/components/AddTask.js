import { useState } from "react";
import { addTaskRequest } from "../apis/TodoApi";
import { FaSync } from "react-icons/fa";
import useTodo from "../hooks/useTodo";

export default function AddTask() {
    const [task, setTask] = useState('');
    const { tasks, addTask, updateTaskId } = useTodo();
    const [failedTasksAvailable, setSync ] = useState(false);

    return (
        <div>
            <div className="add-task-container">
                <AddTaskInput onChange={handleOnChange} task={task} onAddTask={handleAddTask} onKeyUp={handleEnterKey}></AddTaskInput>
                <AddTaskButton onAddTask={handleAddTask}></AddTaskButton>
            </div>
            <div>{failedTasksAvailable &&
                <button className="sync-tasks-button" onClick={() => onSyncTasks()}>
                    <FaSync></FaSync>
                    &nbsp;&nbsp;Sync Tasks
                </button>
            }
            </div>
        </div>
    );

    function handleOnChange(e) {
        if ((e.target.value).trim() !== '') {
            setTask(e.target.value);
        }
    }

    async function handleAddTask() {
        if (task !== '') {

            const { v4: uuidv4 } = require('uuid');
            const key = uuidv4();

            addTask(task, key);
            addTaskRequest(task, addTaskCallback, key);
            setTask("");
        }
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") {
            handleAddTask();
        }
    }

    function addTaskCallback(id, isCreated, key) {
        const status = isCreated ? "CREATED" : "FAILED";
        updateTaskId(id, status, key);
        setSync(!isCreated);
    }

    function onSyncTasks() {
        let failedTasks = tasks.filter(task => task.backendStatus === "FAILED");
        console.log(failedTasks);
        failedTasks.map(task => addTaskRequest(task.name, addTaskCallback, task.key));
    }
}

function AddTaskButton({ onAddTask }) {
    return (
        <button className="add-task-button" id="add-task-button" onClick={onAddTask}>Add Task</button>
    );
}

function AddTaskInput({ onChange, task, onKeyUp }) {
    return (
        <input value={task} type="text" className="add-task-input" id="add-task-input" placeholder="Enter a task" onChange={onChange}
            onKeyUp={onKeyUp} maxLength={35} />
    );
}
