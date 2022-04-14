import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";



export default {
    title: 'TodoLists/Task',
    component: Task,
    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TasIsDoneStory = Template.bind({});
TasIsDoneStory.args = {
    task: {id: '1', isDone: true, title: 'JS'},
};

export const TasIsNotDoneStory = Template.bind({});
TasIsNotDoneStory.args = {
    task: {id: '2', isDone: false, title: 'HTML'},
};

