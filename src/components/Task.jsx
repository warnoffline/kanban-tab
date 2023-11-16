import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import './index.css'
import { Card, CardBody, Text, Button } from '@chakra-ui/react';
import { removeTask } from '../store';
import { useDispatch } from 'react-redux';
const Task = function ({task}) {

  const dispatch = useDispatch()
    const [, drag] = useDrag({
      type: 'TASK',
      item: { id: task.id, task: task.task, column: task.column },
    });
    const containerRef = useRef(null);
    const taskClass = `${task.column === "To-do" ? 'task' : task.column === "Done" ? 'done' : 'progress'}`
    return (  
      <Card className={taskClass}
      ref={(node) => (containerRef.current = node)}
      >
        <div className='container_move' ref={drag}>
           <Button className='task_move' colorScheme='pink'>Move</Button>
          </div>
        <CardBody className='task_body'>
          <Text className='task_text'>{task.task}</Text>
          <Button className='task_delete' onClick={() => dispatch(removeTask(task.id))} colorScheme='red'>Delete</Button>
        </CardBody>
      </Card>
    );
}

export default Task;