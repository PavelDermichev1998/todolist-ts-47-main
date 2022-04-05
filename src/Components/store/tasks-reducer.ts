import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type changeTaskStstusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStstusActionType
    | changeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT


const initialState: TasksStateType = {};


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), isDone: false, title: action.title}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStstusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
