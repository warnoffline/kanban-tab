import React, { useState } from 'react';
import { addTask } from '../store';
import { useDisclosure, Button,  Modal, ModalOverlay, ModalContent , ModalHeader , ModalCloseButton, ModalBody, FormControl, FormLabel, Input,ModalFooter} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {useColorMode} from '@chakra-ui/color-mode'
import { useTranslation } from 'react-i18next';
import './index.css'
 
const Form = function () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [taskText, setTaskText] = useState('');
    const {t} = useTranslation()
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
          <Button className='toggle_button' onClick={toggleColorMode}>
          {colorMode === 'light' ? t('Dark Theme') : t('Light Theme')}
          </Button>
          <Button className="modal_button" colorScheme="blue" onClick={onOpen}>{t("Add Task")}</Button>
        </div>
         <Modal
           isOpen={isOpen}
           onClose={onClose}
         >
           <ModalOverlay />
           <ModalContent>
             <ModalHeader>{t("Add your task")}</ModalHeader>
             <ModalCloseButton />
             <ModalBody pb={6}>
               <FormControl>
                 <FormLabel>{t("Task")}</FormLabel>
                 <Input placeholder={t("Task")} maxLength="50" onChange={(e) => setTaskText(e.target.value)} />
               </FormControl>
             </ModalBody>
             <ModalFooter>
               <Button onClick={handleAddTask} colorScheme='blue' mr={3}>
                 {t("Save")}
               </Button>
               <Button onClick={onClose}>{t("Cancel")}</Button>
             </ModalFooter>
           </ModalContent>
         </Modal>
       </>
    );
}

export default Form;