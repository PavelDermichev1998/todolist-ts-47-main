import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
    changeTodoListTitle: (title: string, todoListID: string) => void
}


const Todolist = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTitle = (title: string) => props.changeTaskTitle(task.id, title, props.id)
        return (
            <ListItem
                disableGutters
                divider
                className={task.isDone ? 'is-done' : ''}
                key={task.id}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0px'
                }}
            >
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan title={task.title} setNewTitle={changeTitle}/>
               <IconButton onClick={removeTask} size={'small'}>
                   <Delete fontSize={'small'}/>
               </IconButton>
            </ListItem>
        );
    });
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    const allBtnClass = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : ''

    return (
        <div className="todolist">
            <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                        <Delete/>
                </IconButton>

            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>

            <div>
                <ButtonGroup
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                >
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    className={allBtnClass}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Todolist;