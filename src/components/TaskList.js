import { FaComment, FaTrash, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import useTodo from "../hooks/useTodo";
import { updateTask, deleteTaskRequest } from "../apis/TodoApi";

export default function TaskList() {

    const { tasks, currentFilterMode } = useTodo();

    return (
        <div className="task-list">
            {currentFilterMode === "all"
                ? tasks.map((item) => <ListItem key={item.key} item={item}></ListItem>)
                : currentFilterMode === "completed"
                    ? tasks
                        .filter((item) => item.isCompleted)
                        .map((item) => <ListItem key={item.key} item={item}></ListItem>)
                    : tasks
                        .filter((item) => !item.isCompleted)
                        .map((item) => <ListItem key={item.key} item={item}></ListItem>)}
        </div>
    );
}

function ListItem({ item }) {
    const { currentFilterMode, filterModes, updateTaskStatus, deleteTask } = useTodo();

    const isCompleted = item.isCompleted;
    const isFailed = item.backendStatus === "FAILED";
    const isInProgress = item.backendStatus === "IN_PROGRESS";

    const classSuffix =
        isCompleted ? (currentFilterMode === filterModes[2] ? "hidden" : "completed") :
            currentFilterMode === filterModes[1] ? "hidden" : "";

    const commentIconVisibility = item.comment && item.comment.trim() !== '' ? 'visible' : 'hidden';

    const handleTaskCompleted = (checked) => {
        updateTask(item);
        updateTaskStatus(item.id, checked);
    };

    const handleTaskDeleted = () => {
        deleteTaskRequest(item.id);
        deleteTask(item.id);
    };

    return (
        <div className={`list-item ${classSuffix}`}>
            <input
                id={item.id}
                type="checkbox"
                className="list-item-checkbox"
                checked={item.isCompleted}
                onChange={(e) => handleTaskCompleted(e.target.checked)}
            />
            <Link to={`task/${item.id}`} className={`list-item-label ${classSuffix}`}>
                {item.name}
            </Link>
            <div className={`list-item-icons ${isFailed || isInProgress ? 'hidden' : ''}`}>
                <FaComment className={`task-comment-icon ${commentIconVisibility}`} />
                <FaTrash
                    className="task-action-button"
                    id={item.id}
                    onClick={handleTaskDeleted}
                >
                    Delete
                </FaTrash>
            </div>
            <div className={`list-item-status-loader ${isFailed || !isInProgress ? 'hidden' : ''}`} />
            <div className={`list-item-failed-icon ${isFailed ? '' : 'hidden'}`}>
                <a data-tooltip-id='failed-icon-tooltip' data-tooltip-content="Adding task failed">
                    <FaExclamationCircle className={`failed-icon`} />
                </a>
                <Tooltip id='failed-icon-tooltip' place="left" noArrow />
            </div>
        </div>
    );
}

