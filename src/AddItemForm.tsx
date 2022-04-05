import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('add')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required</div> : null
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                error={error}
                helperText={errorMessage}

            />
            {/*<input
                style={error ? errorInputStyle : undefined}
                placeholder='Enter your title...'
            />*/}
            <IconButton onClick={addItem}
                        color={'primary'}
                        size={'small'}
            >
                <AddBox fontSize={'large'}/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})

