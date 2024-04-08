export async function getTasks() {
    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks", { method: "GET" });
    const tasks = await response.json();
    return tasks;
}

export async function addTaskRequest(task, addTaskCallback, key) {

      const taskForApi = {
        name: task,
        id: -1,
        completed: false,
        comment: ''
    };
 
    //Fake Network Behaviour
    await new Promise(resolve => setTimeout(resolve, 1000));
    const random = Math.random();

    try {
        if (random < 0.3) {
            throw new Error("Network Error");
        }
    } catch {
        addTaskCallback(-1, false, key);
        return;
    }

    try {
        const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks", {
            method: "POST", headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, body: JSON.stringify(taskForApi)
        });

        if (!response.ok) {
            addTaskCallback(-1, false, key);

            throw new Error("Network response was not OK");
        }

        const addTaskResponse = await response.json();
        addTaskCallback(addTaskResponse.id, true, key);
    } catch (error) {
        addTaskCallback(-1, false, key);
    }
}

export async function deleteTaskRequest(id) {
    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks/" + id, { method: "DELETE" });
    const taskDeleted = await response.json();
}

export async function updateTaskRequest(task) {
    const data = {
        id: task.id,
        name: task.name,
        comment: task.comment,
        completed: task.completed
    }

    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks/" + data.id, {
        method: "PUT", headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data));
    const taskUpdated = await response.json();
}