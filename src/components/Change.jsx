import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.css'
import { useDisclosure, Button,  Modal, ModalOverlay, ModalContent , ModalHeader , ModalCloseButton, ModalBody, FormControl, FormLabel, Input,ModalFooter} from '@chakra-ui/react';
import { changeTask } from '../store';
import write from './img/free-icon-write-4223780.png'
import { useTranslation } from 'react-i18next';

const Change = function ({index}) {
    const {t} = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [taskText, setTaskText] = useState('');
    const dispatch = useDispatch();
    const handleChangeTask = () =>{
        if (taskText.trim() !== '') {
            dispatch(changeTask(index, taskText))
            setTaskText('')
            onClose()
          }
    }
    return (  
        <>
        <div className='change_button'>
            <Button className='but_img' colorScheme='yellow' onClick={onOpen}><img src={write} alt="Change" /></Button>
        </div>
         <Modal
           isOpen={isOpen}
           onClose={onClose}
         >
           <ModalOverlay />
           <ModalContent>
             <ModalHeader>{t("Change your task")}</ModalHeader>
             <ModalCloseButton />
             <ModalBody pb={6}>
               <FormControl>
                 <FormLabel>{t("Task")}</FormLabel>
                 <Input placeholder={t("Task")} maxLength="50" onChange={(e) => setTaskText(e.target.value)} />
               </FormControl>
             </ModalBody>
             <ModalFooter>
               <Button onClick={handleChangeTask} colorScheme='blue' mr={3}>
                {t("Save")}
               </Button>
               <Button onClick={onClose}>{t("Cancel")}</Button>
             </ModalFooter>
           </ModalContent>
         </Modal>
       </>
    );
}

export default Change;