import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import './index.css'
import { Card, CardBody, Text, Button } from '@chakra-ui/react';
import { removeTask } from '../store';
import { useDispatch } from 'react-redux';
const Task = function ({task}) {
  const touchRef = useRef(null);
  const [startTime, setStartTime] = useState(null);

  const dispatch = useDispatch()
    const [, drag] = useDrag({
      type: 'TASK',
      item: { id: task.id, task: task.task, column: task.column },
    });
  
    const onTouchStart = () => {
      setStartTime(new Date().getTime());
    };
  
    const onTouchEnd = () => {
      const endTime = new Date().getTime();
      const touchDuration = endTime - startTime;
      // Проверка длительности удержания (в данном случае 1000 миллисекунд)
      if (touchDuration >= 500) {
        drag(touchRef.current);
      }
    };
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const taskClass = `${task.column === "To-do" ? 'task' : task.column === "Done" ? 'done' : 'progress'}`
    return (  
      <Card className={taskClass}
      ref={node => {
        touchRef.current = node
        if (!isTouchDevice) {
          drag(node);
        }
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ cursor: 'grab' }}>
        <CardBody className='task_body'>
          <Text className='task_text'>{task.task}</Text>
          <Button className='task_delete' onClick={() => dispatch(removeTask(task.id))} colorScheme='red'>Delete</Button>
        </CardBody>
      </Card>
    );
}

export default Task;