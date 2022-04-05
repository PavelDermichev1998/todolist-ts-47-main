import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./Components/store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./Components/store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Components/store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
//BLL

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID));
    },[dispatch]);
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID));
    },[dispatch]);
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
    },[dispatch]);
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID));

    },[dispatch]);

    const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
    },[dispatch]);
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(title, todoListID))
    },[dispatch]);
    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action);
    },[dispatch]);
    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action);
    },[dispatch]);

//UI

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '29px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={8} style={{padding: '20px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
