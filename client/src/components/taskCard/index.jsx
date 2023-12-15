import { Card,  } from 'antd'
import './task-card-styles.css'
import {EditOutlined} from '@ant-design/icons';

import { TaskModal } from '../taskModal';
import { useState } from 'react';

export function TaskCard(props){   
  
    console.log(props.photo)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
    
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    let taskImg =props.photo?.replace('C:/Users/User/Documents/testes entrevistas/brickup_challenge/client/src/uploads/', '../../uploads/').toString()
    
    const name = 'task_52_Certificado.png'
    console.log(taskImg)
    return(
        <>
        <Card title={props.name}    className='task_card'>            
            <EditOutlined  className='task_card__edit' onClick={()=>showModal()}/> 
            <div className={`task_card__status ${props.status === 'pendente' ? 'pending' : 'completed'}`} >{props.id} : {props.status} </div>
            <div className="task_card_info">
             
                <div className="task_card_img__div">
                    <img className="task_card_img" src={props.photo?.toString()} alt='imag' />
                </div>
                <div  className='task_card__description'> {props.description} </div>
            </div>            
            {props.photo}
        </Card>
        <TaskModal
            typeModal='edit'
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            taskId={props.id}
            taskName={props.name}
            taskPhoto={props.photo}
            taskDescription={props.description}
            taskStatus={props.status}
        />
        </>
    )
}