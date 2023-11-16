import React from 'react';
import { useDrag } from 'react-dnd';
import './index.css'
import { Card, CardBody, Text, Button } from '@chakra-ui/react';
import { removeTask } from '../store';
import { useDispatch } from 'react-redux';
const Task = function ({task}) {
  const dispatch = useDispatch()
    console.log(task.id)
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, task: task.task, column: task.column },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });
    const taskClass = `${task.column === "To-do" ? 'task' : task.column === "Done" ? 'done' : 'progress'}`
    return (  
      <Card className={taskClass} ref={drag}>
        <CardBody className='task_body'>
          <Text className='task_text'>{task.task}</Text>
          <Button className='task_delete' onClick={() => dispatch(removeTask(task.id))} colorScheme='red'>Delete</Button>
        </CardBody>
      </Card>
    );
}

export default Task;