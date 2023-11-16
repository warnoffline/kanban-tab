import React from 'react';
import Form from './components/Form';
import ColumnTask from './components/ColumnTask';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'

const App = function () {
    return (  
        <DndProvider backend={HTML5Backend}>
            <div className='list'>
                <Form/>
                <div className='columns'>
                    <ColumnTask title="To-do" />
                    <ColumnTask title="In Progress" />
                    <ColumnTask title="Done" />
                </div>
            </div>
        </DndProvider>
    );
}

export default App;