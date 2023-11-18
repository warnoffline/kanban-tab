import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store';
import './index.css'
import { useDisclosure, Button,  Modal, ModalOverlay, ModalContent , ModalHeader , ModalCloseButton, ModalBody, FormControl, FormLabel, Input,ModalFooter} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {useColorMode} from '@chakra-ui/color-mode'
 
const Form = function () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [taskText, setTaskText] = useState('');
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks)
    const { colorMode, toggleColorMode } = useColorMode()
    const handleAddTask = () => {
        if (taskText.trim() !== '') {
          const taskId = `${tasks.length + 1}`;
          dispatch(addTask(taskId, taskText, "To-do"))
          setTaskText('')
          onClose()
        }
    };
    return (  
        <>
        <div className='buttons_head'>
        <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
         <Button className="modal_button" colorScheme="blue" onClick={onOpen}>Add Task</Button>
        </div>
         <Modal
           isOpen={isOpen}
           onClose={onClose}
         >
           <ModalOverlay />
           <ModalContent>
             <ModalHeader>Add your task</ModalHeader>
             <ModalCloseButton />
             <ModalBody pb={6}>
               <FormControl>
                 <FormLabel>Task</FormLabel>
                 <Input placeholder='Task' maxLength="50" onChange={(e) => setTaskText(e.target.value)} />
               </FormControl>
             </ModalBody>
             <ModalFooter>
               <Button onClick={handleAddTask} colorScheme='blue' mr={3}>
                 Save
               </Button>
               <Button onClick={onClose}>Cancel</Button>
             </ModalFooter>
           </ModalContent>
         </Modal>
       </>
    );
}

export default Form;