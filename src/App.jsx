import React from 'react';
import Form from './components/Form';
import ColumnTask from './components/ColumnTask';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTask } from './store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {Button} from '@chakra-ui/react';
import './App.css'

const App = function () {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const changeLanguageHandler = (newLanguage) => {
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("lng", newLanguage)
    };
    const handleDragEnd = (result) => {
        const { draggableId, destination, source } = result;
        if (!destination) {
            return;
        }
        dispatch(moveTask(draggableId, destination.droppableId, destination.index, source.index, source.droppableId));
    };
    return (  
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='list'>
                <Form/>
                <div className='lang'>
                    <Button onClick={() => changeLanguageHandler('en')}>en</Button>
                    <Button onClick={() => changeLanguageHandler('ru')}>ru</Button>
                </div>         
                <div className='columns'>
                    <ColumnTask title="To-do" />
                    <ColumnTask title="In Progress" />
                    <ColumnTask title="Done" />
                </div>
            </div>
        </DragDropContext>
    );
}

export default App;