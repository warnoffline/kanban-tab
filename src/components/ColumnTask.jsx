import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../store';
import './index.css'
import { Card, CardBody, CardHeader, Heading, Divider } from '@chakra-ui/react';

const ColumnTask = function ({title}) {
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            if (item.column !== title) {
              dispatch(moveTask(item.id, title));
            }
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      });

    return (  
        <Card className='column' ref={drop}>
          <CardHeader>
            <Heading className='column_title'>{title}</Heading>
            <Divider/>
          </CardHeader>
          <CardBody className='column_body'>
            {tasks.filter(task => task.column === title).map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </CardBody>
        </Card>
    );
}

export default ColumnTask;