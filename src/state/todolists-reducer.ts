import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodosACType

export type GetTodosACType = ReturnType<typeof getTodosAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "GET-TODOS":{
            return action.todos.map((t)=>{
                return {
                    ...t,
                    filter: "all",
                }
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const getTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: 'GET-TODOS',
        todos
    } as const
}



export const getTodosTC = () => (dispatch: Dispatch, getState: any): void => {
        todolistsAPI.getTodolists()
            .then((res)=>{
                dispatch(getTodosAC(res.data))
            })
    }

export const removeTodosTC = (id: string) => (dispatch: Dispatch, getState: any): void => {
    todolistsAPI.deleteTodolist(id)
        .then((res)=>{
            dispatch(removeTodolistAC(id))
        })
}

export const addTodosTC = (title: string) => (dispatch: Dispatch, getState: any): void => {
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch, getState: any): void => {
    todolistsAPI.updateTodolist(id, title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(id, title))
        })
}



