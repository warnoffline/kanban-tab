import React from 'react';
import Task from './Task';
import { useSelector } from 'react-redux';
import './index.css'
import { Card, CardBody, CardHeader, Heading, Divider } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';

const ColumnTask = function ({title}) {
    const tasks = useSelector(state => state.tasks)
    return (  
        <Card className='column'>
          <CardHeader>
            <Heading className='column_title'>{title}</Heading>
            <Divider/>
          </CardHeader>
          <Droppable droppableId={title} >
            {(provided, snapshot) => (
              <CardBody className='column_body' ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.filter(task => task.column === title).map((task, index) => (
                  <Task task={task} index={index}/>
                ))}
                {provided.placeholder}
              </CardBody>
            )}
          </Droppable>
        </Card>
        
    );
}

export default ColumnTask;