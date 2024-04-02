import { useContext, useState } from "react";
import { addTaskRequest } from "../apis/TodoApi";
import useTodo from "../hooks/useTodo";


export default function AddTask() {
    const [task, setTask] = useState('');
    const { addTask, updateTaskId } = useTodo();

    return (
        <div className="add-task-container">
            <AddTaskInput onChange={handleOnChange} task={task} onAddTask={handleAddTask} onKeyUp={handleEnterKey}></AddTaskInput>
            <AddTaskButton onAddTask={handleAddTask}></AddTaskButton>
        </div>
    );

    function handleOnChange(e) {
        if ((e.target.value).trim() !== '') {
            setTask(e.target.value);
        }
    }

    async function handleAddTask() {
        if (task !== '') {

            const newTask = {
                name: task,
                id: -1,
                isCompleted: false,
                comment: ''
            };

            const { v4: uuidv4 } = require('uuid');
            const key = uuidv4();

            addTask(task, key);
            addTaskRequest(newTask, addTaskCallback, key);
            setTask("");
            
        }
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") {
            handleAddTask();
        }
    }

    function addTaskCallback(id, isCreated, key) {
        console.log("UPDATE ID CALLBACK");
        const status = isCreated ? "CREATED" : "FAILED";
        updateTaskId(id, status, key);
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
