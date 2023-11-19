import React from 'react';
import { Card, CardBody, Text, Button } from '@chakra-ui/react';
import { removeTask } from '../store';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import Change from './Change';
import bin from './img/free-icon-bin-839571.png'
import './index.css'

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
                <div className='task_text_around'>
                  <Text className='task_text'>{task.task}</Text>
                </div>
                <div className='task_buttons'>
                  <Change index={task.id} />
                  <div className='task_delete'>
                    <Button className='but_img' onClick={() => dispatch(removeTask(task.id))} colorScheme='red'><img src={bin} alt="Delete" /></Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </Draggable>
    );
}

export default Task;