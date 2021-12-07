import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const errorInputStyle = {border: '2ps solid red', outline: 'none'}
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
            <input
                style={error ? errorInputStyle : undefined}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                placeholder='Enter your title...'
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}

