import { useReducer, createContext } from "react";

const FILTER_MODES = ["all", "completed", "uncompleted"];

const initialState = {
    tasks: [],
    currentFilterMode: "all"
};

const TodoContext = createContext({
    ...initialState,
    addTask: () => { },
    updateTaskStatus: () => { },
    deleteTask: () => { },
    onFilterChange: () => { },
    editTaskComment: () => { },
    updateTaskId: () => { },
    setTasks: () => { },
});

const tasksReducer = (state, action) => {
    if (action.type === "ADD_TASK") {
        return {
            ...state,
            tasks: [
                ...state.tasks,
                {
                    id: action.task.id,
                    name: action.task.name,
                    completed: action.task.completed,
                    comment: action.task.comment,
                    backendStatus: action.task.backendStatus,
                    key: action.task.key
                },
            ],
        };
    }

    if (action.type === "UPDATE_TASK") {
        return {
            ...state,
            tasks: state.tasks.map((t) => {
                if (t.id === action.task.id) {
                    return {
                        ...t,
                        completed: action.task.completed,
                    };
                } else {
                    return t;
                }
            }),
        };
    }

    if (action.type === "DELETE_TASK") {
        return {
            ...state,
            tasks: state.tasks.filter((t) => t.id !== action.task.id),
        };
    }

    if (action.type === "FILTER_TASKS") {
        return {
            ...state,
            currentFilterMode: action.mode,
        };
    }

    if (action.type === "EDIT_COMMENT") {
        return {
            ...state, tasks: state.tasks.map(t => {
                if (t.id === action.task.id) {
                    return { ...t, comment: action.task.comment };
                } else {
                    return t;
                }
            }),
        }
    }

    if (action.type === "UPDATE_ID") {
        return {
            ...state, tasks: state.tasks.map(t => {
                if (t.key === action.task.key) {
                    return { ...t, id: action.task.id, backendStatus: action.task.backendStatus, key: action.task.key };
                } else {
                    return t;
                }
            }),
        }
    }

    if (action.type === "SET_TASKS") {
        return {
            ...state,
            tasks: [...action.tasks]
        }
    }
}

function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const addTask = (name, key) => {
        const task = {
            id: -1,
            name,
            completed: false,
            comment: "",
            backendStatus: 'IN_PROGRESS',
            key: key,
        };

        dispatch({
            type: "ADD_TASK",
            task,
        });
    };

    const updateTaskStatus = (id, completed) => {
        dispatch({
            type: "UPDATE_TASK",
            task: {
                id,
                completed: completed,
            },
        });
    };

    const deleteTask = (id) => {
        dispatch({
            type: "DELETE_TASK",
            task: {
                id,
            },
        });
    };

    const onFilterChange = (mode) => {
        dispatch({
            type: "FILTER_TASKS",
            mode,
        });
    };

    const editTaskComment = (id, comment) => {
        dispatch({
            type: "EDIT_COMMENT",
            task: {
                id,
                comment: comment,
            }
        });
    };

    const updateTaskId = (id, backendStatus, key) => {
        dispatch({
            type: "UPDATE_ID",
            task: {
                id,
                backendStatus: backendStatus,
                key: key,
            }
        });
    };

    const setTasks = (tasks) => {
        dispatch({
            type: "SET_TASKS",
            tasks: tasks
        });
    };

    return (
        <TodoContext.Provider
            value={{
                ...state,
                filterModes: FILTER_MODES,
                addTask,
                deleteTask,
                updateTaskStatus,
                onFilterChange,
                editTaskComment,
                updateTaskId,
                setTasks,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
