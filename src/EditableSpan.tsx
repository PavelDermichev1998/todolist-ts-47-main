import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onEditMode = () => {
        setEditMode(true)
        if (props.title) {
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
            ? <TextField
                style={{width: '150px'}}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
            />
            : <span
                onDoubleClick={onEditMode}>
                {props.title}
                <IconButton onClick={onEditMode} size={'small'} style={{marginLeft: '40px'}}>
                <Edit fontSize={'small'}/>
            </IconButton>
            </span>

    )
});