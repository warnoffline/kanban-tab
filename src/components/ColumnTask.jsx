import React from 'react';
import Task from './Task';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Heading, Divider } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import './index.css'

const ColumnTask = function ({title}) {
  const {t} = useTranslation()

  const tasks = useSelector(state => state.tasks)
  return (  
      <Card className='column'>
        <CardHeader>
          <Heading className='column_title'>{t(`${title}`)}</Heading>
          <Divider/>
        </CardHeader>
        <Droppable droppableId={title} >
          {(provided, snapshot) => (
            <CardBody className='column_body' ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => {
                if(task.column == title){
                  return <Task task={task} index={index}/>
                }
                })}
              {provided.placeholder}
            </CardBody>
          )}
        </Droppable>
      </Card>
  );
}

export default ColumnTask;