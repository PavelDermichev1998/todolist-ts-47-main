import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export type RemoveTodoListAT  = {
    type:'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT  = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ActionType = RemoveTodoListAT  | AddTodoListAT  | ChangeTodolistTitleAT | ChangeTodoListFilterAT


export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists;
    }
};

export const RemoveTodoListAC = (id:string):RemoveTodoListAT => {
    return {type:'REMOVE-TODOLIST', id}
}
export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const ChangeTodolistTitleAC = (title: string, id:string):ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const ChangeTodoListFilterAC = (id:string,  filter: FilterValuesType):ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

