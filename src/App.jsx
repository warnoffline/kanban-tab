import React from 'react';
import Form from './components/Form';
import ColumnTask from './components/ColumnTask';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css'
import { moveTask } from './store';
import { useDispatch } from 'react-redux';

const App = function () {
    const dispatch = useDispatch()
    const handleDragEnd = (result) => {
        console.log(result)
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