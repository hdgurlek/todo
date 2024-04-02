/* import { createContext, useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
export const FilterContext = createContext(null);
export const FilterDispatchContext = createContext(null);

let initialTasks = [];
export const filterModes = ['all', 'completed', 'uncompleted'];

export function TasksProvider({ children }) {
    initialTasks = useLoaderData();
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    const [filter, filterDispatch] = useReducer(filterReducer, filterModes[0]);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                <FilterContext.Provider value={filter}>
                    <FilterDispatchContext.Provider value={filterDispatch}>
                        {children}
                    </FilterDispatchContext.Provider>
                </FilterContext.Provider>
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

function filterReducer(filter, action) {
    if (action.type) {
        return action.mode;
    }
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'add': {
            return [
                action.task, ...tasks
            ]
        }
        case 'complete': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return {...t, completed: action.task.completed};
                } else {
                    return t;
                }
            });
        }
        case 'delete': {
            return tasks.filter(t => t.id !== action.task.id);
        }
        case 'edit_comment': {
            return tasks.map(t => {
                if (t.id == action.task.id) {
                    return { ...t, comment: action.task.comment };
                } else {
                    return t;
                }
            });
        }
        case 'update_id': {
            return tasks.map(t => {
                if (t.key === action.task.key) {
                    return { ...t, id: action.task.id, backendStatus: action.task.backendStatus, key: action.task.key};
                } else {
                    return t;
                }
            });
        }
    }
}
 */