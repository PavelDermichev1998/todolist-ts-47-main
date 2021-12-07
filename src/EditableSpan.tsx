import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onEditMode = () => {
        setEditMode(true)
        if(props.title){
            setTitle(props.title)
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            : <span
                onDoubleClick={onEditMode}>
                {props.title}
                <button onClick={onEditMode}>edit</button>
            </span>

    )
}