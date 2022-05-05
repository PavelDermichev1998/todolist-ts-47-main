
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type NullableType<T> = null | T

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type setAppStatusACType = ReturnType<typeof setAppStatusAC>
type setAppErrorACType = ReturnType<typeof setAppErrorAC>

export type AppActionsType = setAppStatusACType | setAppErrorACType