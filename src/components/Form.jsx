import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store';
import './index.css'
import { useDisclosure, Button,  Modal, ModalOverlay, ModalContent , ModalHeader , ModalCloseButton, ModalBody, FormControl, FormLabel, Input,ModalFooter} from '@chakra-ui/react';

const Form = function () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [taskText, setTaskText] = useState('');
    const dispatch = useDispatch();
    const generateUniqueId = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000000);
        return `${timestamp}-${random}`;
      };
    const handleAddTask = () => {
        if (taskText.trim() !== '') {
            dispatch(addTask(generateUniqueId(), taskText, "To-do"))
            setTaskText('')
            onClose()
        }
    };
    return (  
        <>
         <Button colorScheme="blue" onClick={onOpen}>Add Task</Button>
   
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