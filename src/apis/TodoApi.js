export async function getTasks() {
    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks", { method: "GET" });
    const tasks = await response.json();
    console.log(tasks);
    return tasks;
}

export async function addTaskRequest(task, addTaskCallback, key) {

    await new Promise(resolve => setTimeout(resolve, 1000));
    const random = Math.random();

    try{
        if (random < 0.6) {
            throw new Error("Network response was not OK");
        }
    }catch{
        addTaskCallback(-1, false, key);
        return;
    }

    try {
        const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks", {
            method: "POST", headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, body: JSON.stringify(task)
        });

        if (!response.ok) {
            addTaskCallback(-1, false, key);

            throw new Error("Network response was not OK");
        }

        const addTaskResponse = await response.json();
        addTaskCallback(addTaskResponse.id, true, key);

        console.log("ADD TASK RESPONSE: ID: " + JSON.stringify(addTaskResponse));

    } catch (error) {
        console.log("Error: Add Task request");
        addTaskCallback(-1, false, key);
    }
}

export async function deleteTaskRequest(id) {
    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks/" + id, { method: "DELETE" });
    const taskDeleted = await response.json();
    console.log(taskDeleted);
}

export async function updateTask(task) {
    const response = await fetch("https://65f43a90f54db27bc0210690.mockapi.io/todo/tasks/" + task.id, {
        method: "PUT", headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, body: JSON.stringify(task)
    });
    const taskUpdated = await response.json();
    console.log("SENT TASK: " + JSON.stringify(task) + " RESPONSE: " + taskUpdated);
}