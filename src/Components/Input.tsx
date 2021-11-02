import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    callBack: () => void
    title: string
    setNewTaskTitle: (title: string) => void
}
export const Input = (props: InputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack()
        }
    }

    return (
        <input
            value={props.title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
    )
}