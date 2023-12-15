import './task-card-styles.css'
import { Card, Image,  } from 'antd'
import {EditOutlined} from '@ant-design/icons';

import { useState } from 'react';
import { TaskModal } from '../taskModal';
import defaultImage from '../../uploads/default_image.png'

export function TaskCard(props){   
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
    
    const taskPhoto = props.photo ? `http://localhost:8080/images/uploads/${props.photo}` : defaultImage
    
    return(
        <>
        <Card title={props.name}    className='task_card'>            
            <EditOutlined  className='task_card__edit' onClick={()=>showModal()}/> 
            <div className={`task_card__status ${props.status === 'pendente' ? 'pending' : 'completed'}`} >
              {props.status} 
            </div>
            <div className="task_card_info">
              <div className="task_card_img__div">                
                <Image className="task_card_img" width={60} height={50} src={taskPhoto}  />
              </div>
              <div  className='task_card__description'> {props.description} </div>
            </div>                        
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