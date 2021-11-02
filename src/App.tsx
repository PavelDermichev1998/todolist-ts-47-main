import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
//BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        /*const updatedTasks = tasks.map(t => {
            if (t.id === taskID) {
                 return {...t, isDone: isDone}
             }
                 return t
           })*/
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone} : t))
    }


//UI
    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                filter={filter}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
