import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (todoListID: string, filter: FilterValuesType) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


const Todolist = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
                }}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    onChange={changeStatus}
                    checked={task.isDone}
                />

                <EditableSpan title={task.title} setNewTitle={changeTitle}/>
               <IconButton onClick={removeTask} size={'small'}>
                   <Delete fontSize={'small'}/>
               </IconButton>
            </ListItem>
        );
    });
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[props.addTask, props.id])

    const onAllClickHandler = () => props.changeFilter(props.id,'all')
    const onActiveClickHandler = () => props.changeFilter( props.id,'active')
    const onCompletedClickHandler = () => props.changeFilter( props.id,'completed')
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div className="todolist">
            <Typography
                variant={'h6'}
                style={{fontWeight: 'bold'}}
                align={'center'}
            >
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                        <Delete/>
                </IconButton>

            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}
                    disableElevation
                    variant={'contained'}
                    size={'small'}
                >
                    All
                </Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}
                    disableElevation
                    variant={'contained'}
                    size={'small'}
                >
                    Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}
                    disableElevation
                    variant={'contained'}
                    size={'small'}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;