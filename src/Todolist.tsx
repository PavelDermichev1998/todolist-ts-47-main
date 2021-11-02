import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}


const Todolist = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li
                className={task.isDone ? 'is-done' : ''}
                key={task.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    });
    const addNewTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
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
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required</div> : null

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    placeholder='Enter your task...'
                />
                <button onClick={addNewTask}>+</button>
                {errorMessage}
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