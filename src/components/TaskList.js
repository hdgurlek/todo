import { FaComment, FaTrash, FaExclamationCircle, FaSync } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import useTodo from "../hooks/useTodo";
import {deleteTaskRequest, updateTaskRequest } from "../apis/TodoApi";

export default function TaskList() {

    const { tasks, currentFilterMode } = useTodo();

    return (
        <div className="task-list">
            {currentFilterMode === "all"
                ? tasks.map((item) => <ListItem item={item}></ListItem>)
                : currentFilterMode === "completed"
                    ? tasks
                        .filter((item) => item.completed)
                        .map((item) => <ListItem item={item}></ListItem>)
                    : tasks
                        .filter((item) => !item.completed)
                        .map((item) => <ListItem item={item}></ListItem>)}
        </div>
    );
}

function ListItem({ item }) {
    const { currentFilterMode, filterModes, updateTaskStatus, deleteTask } = useTodo();

    const completed = item.completed;
    const isFailed = item.backendStatus === "FAILED";
    const isInProgress = item.backendStatus === "IN_PROGRESS";

    const classSuffix =
        completed ? (currentFilterMode === filterModes[2] ? "hidden" : "completed") :
            currentFilterMode === filterModes[1] ? "hidden" : "";

    const commentIconVisibility = item.comment && item.comment.trim() !== '' ? 'visible' : 'hidden';

    const handleTaskCompleted = (checked) => {
        updateTaskRequest({ ...item, completed: checked });
        updateTaskStatus(item.id, checked);
    };

    const handleTaskDeleted = () => {
        deleteTaskRequest(item.id);
        deleteTask(item.id);
    };

    const opacity = item.id === -1 ? 0.5 : 1;
    const pointerEvents = item.id === -1 ? 'none' : '';

    return (

        <div className={`list-item ${classSuffix}`}>
            <input
                id={item.id}
                type="checkbox"
                className="list-item-checkbox"
                checked={item.completed}
                onChange={(e) => handleTaskCompleted(e.target.checked)}
                style={{ opacity: opacity, pointerEvents: pointerEvents }}
            />
            <Link to={`task/${item.id}`} className={`list-item-label ${classSuffix}`}
                style={{ opacity: opacity, pointerEvents: pointerEvents }}
            >
                {item.name}
            </Link>
            <div className={`list-item-icons ${isFailed || isInProgress ? 'hidden' : ''}`}>
                <Link to={`task/${item.id}`}>
                    <FaComment className={`task-comment-icon ${commentIconVisibility}`} />
                </Link>
                <FaTrash
                    className="task-delete-button"
                    id={item.id}
                    onClick={handleTaskDeleted}
                >
                    Delete
                </FaTrash>
            </div>
            <div className={`loader-container ${!isInProgress ? 'hidden' : ''}`}>
                <div className="list-item-status-loader"/>

            </div>
            <div className={`list-item-failed-icon ${isFailed ? '' : 'hidden'}`} style={{ opacity: '1' }}>
                <a data-tooltip-id='failed-icon-tooltip' data-tooltip-content="Adding task failed">
                    <FaExclamationCircle className={`failed-icon`} />
                </a>
                <Tooltip id='failed-icon-tooltip' place="left" noArrow />
            </div>
        </div>
    );
}

