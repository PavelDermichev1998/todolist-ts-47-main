import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./Components/store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./Components/store/tasks-reducer";

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


function AppWithReducer() {
//BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What is learn', filter: 'all'},
        {id: todoListID_2, title: 'What is buy', filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'meat', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'bear', isDone: false},
        ],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID));
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title,todoListID));
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID,isDone,todoListID));
    };
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID,title,todoListID));

    };

    const changeFilter = ( todoListID: string,filter: FilterValuesType) => {
        dispatchToTodoLists(changeTodoListFilterAC(todoListID,filter))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodolistTitleAC(title,todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

//UI

    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}
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
    })

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
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
