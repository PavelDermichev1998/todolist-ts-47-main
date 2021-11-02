import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


const Todolist = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const tasksJSXElements = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    });
    const addNewTask = () => {
        if (newTaskTitle) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    const allBtnClass = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={addNewTask}>+</button>
            </div>

            <ul>
                {tasksJSXElements}
            </ul>

            <div>
                <button
                    className={allBtnClass}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;