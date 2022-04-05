import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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


export const Todolist = React.memo((props: TodoListPropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.id]);

    const removeTodoList = useCallback(() => props.removeTodoList(props.id),[props.removeTodoList,props.id]);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)}, [props.changeTodoListTitle, props.id]);

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    }, [props.removeTask, props.id]);
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone, props.id)
    }, [props.changeTaskStatus, props.id]);
    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        props.changeTaskTitle(taskID, title, props.id)
    }, [props.changeTaskTitle, props.id]);



    let tasksForRender = props.tasks
    if (props.filter === 'active') {
        tasksForRender = tasksForRender.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForRender = tasksForRender.filter(t => t.isDone)
    }

    return (
        <div className="todolist">
            <Typography
                variant={'h6'}
                style={{fontWeight: 'bold'}}
                align={'center'}
            >
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>

            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksForRender.map(task => {

                    return (
                        <Task
                            key={task.id}
                            task={task}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
                    );
                })}
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
});
