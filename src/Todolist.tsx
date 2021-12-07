import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}


const Todolist = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTitle = (title: string) => props.changeTaskTitle(task.id, title, props.id)
        return (
            <li
                className={task.isDone ? 'is-done' : ''}
                key={task.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan title={task.title} setNewTitle={changeTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        );
    });
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const allBtnClass = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div className="todolist">
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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