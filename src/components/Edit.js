import { Link, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import React, { useState } from 'react';
import useTodo from "../hooks/useTodo";
import { updateTask } from "../apis/TodoApi";

export default function Edit() {

    let { taskId } = useParams();
    const { tasks, editTaskComment } = useTodo();

    const task = tasks.find(t => t.id === taskId);

    const [comment, setComment] = useState(task.comment);

    const handleTaskEdited = () => {
        editTaskComment(task.id, task.comment);
        updateTask(task);
    };

    return (
        <div className="edit-window">
            <div className="edit-window-content">
                <Link className="edit-window-content-done" to="/" role="button" onClick={handleTaskEdited}><MdClose /></Link>
                <div className="edit-window-content-task-name">{task.name}</div>
                <input type="text" className="edit-window-content-comment" placeholder="Write a comment here.."
                    onChange={(e) => { setComment(e.target.value); }} value={comment}
                />
            </div>
        </div>
    );
}