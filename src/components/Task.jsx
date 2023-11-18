import React from 'react';
import './index.css'
import { Card, CardBody, Text, Button } from '@chakra-ui/react';
import { removeTask } from '../store';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

const Task = function ({task, index}) {
  const dispatch = useDispatch()
  console.log(task) 
  const taskClass = `${task.column === "To-do" ? 'task' : task.column === "Done" ? 'done' : 'progress'}`
    return (  
      <Draggable key={parseInt(task.id)} draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className={taskClass}>
              <CardBody className='task_body'>
                <Text className='task_text'>{task.task}</Text>
                <Button className='task_delete' onClick={() => dispatch(removeTask(task.id))} colorScheme='red'>Delete</Button>
              </CardBody>
            </Card>
          </div>
        )}
      </Draggable>
    );
}

export default Task;