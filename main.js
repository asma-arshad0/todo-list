#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.blueBright("\n ----Welcome to Todo-List Application---- \n"));
let todoList = [];
let condition = true;
//smiple Todo list application code:
//  while(condition){
//     let addTask = await inquirer.prompt([
//         {
//             name: "toDo",
//             type: "input",
//             message: "What do you want to add a Task?"
//         }, 
//         {
//             name: "addMore",
//             type: "confirm",
//             message: "Are you want to add more Task?",
//             default: "true"
//         }
//     ]);
//     todoList.push(addTask.toDo);
//     console.log(addTask.toDo);
//     condition = addTask.addMore
// };
//  console.log("Your  total List of tasks:" , todoList);
//Updated todo list app;
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Updated Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Updated Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
// function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your Task:",
            validate: function (value) {
                if (!value.trim()) {
                    return "Please enter a task name.";
                }
                if (/^\d+$/.test(value)) {
                    return "Task name should not contain numbers. Please enter a valid task name.";
                }
                return true;
            }
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added sucessfully in Todo-List`);
};
// Funtion to view all todo list tasks
let viewTask = () => {
    console.log(`\n Your Todo-List:`);
    todoList.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
};
// function to Delete a task from list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete:",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`/n ${deletedTask} this task has been deleted to your todo-list.`);
};
// funtion to update task to list
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to update:"
        },
        {
            name: "newTask",
            type: "input",
            message: "Now Enter new task name:"
        }
    ]);
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.newTask;
    console.log(`\n Task at index no. ${updateTaskIndex.index - 1} updated sucessfully [For update list check option: "Veiw Todo-List" ]`);
};
main();
