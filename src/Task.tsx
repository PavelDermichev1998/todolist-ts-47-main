import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}
export const Task = React.memo(({task, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {
    console.log('Tas')
    const onClickHandler = useCallback(() => removeTask(task.id),[removeTask, task.id]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)},[changeTaskStatus,task.id]);
    const onTitleChangeHandler = useCallback((title: string) => changeTaskTitle(task.id, title),[changeTaskTitle, task.id])

    return (
        <ListItem
            disableGutters
            divider
            className={task.isDone ? 'is-done' : ''}
            key={task.id}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0px'
            }}>
            <Checkbox
                size={'small'}
                color={'primary'}
                onChange={onChangeHandler}
                checked={task.isDone}
            />

            <EditableSpan title={task.title} setNewTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} size={'small'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
});