import {AppActionsType, setAppErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";



export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    dispatch(setAppErrorAC(data.messages.length
        ? data.messages[0]
        : 'Some error occured')
    )
}