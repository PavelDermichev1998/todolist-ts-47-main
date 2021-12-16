import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
//BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What is learn', filter: 'all'},
        {id: todoListID_2, title: 'What is buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)
        })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
        //берем все тудулисты, но к тудулисту с todoListID добавляем в его массив новую таску
        //и добавляем все таски, которые были у тудулиста с этим айди
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        /*const updatedTasks = tasks.map(t => {
            if (t.id === taskID) {
                 return {...t, isDone: isDone}
             }
                 return t
           })*/
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        })
    };
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        })
    };
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
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

export default App;
