import './task-card-styles.css'
import { Button, Card, Image, Popconfirm, message,  } from 'antd'
import {CheckOutlined, EditOutlined} from '@ant-design/icons';

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
    
    const confirm = async() => {
      const taskId = props.id
      const taskConclued ={
        id: taskId,
        status:'concluido'
      }
      await fetch(process.env.REACT_APP_TASK_URI, {
        method:'PUT',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(taskConclued)
      })
      message.success('Tarefa concluída com sucesso!');
    };

    
    const taskPhoto = props.photo ? `http://localhost:8080/images/uploads/${props.photo}` : defaultImage
    const status = props.status
    
    return(
        <>
        <Card title={props.name} className='task_card'>            
          {status === 'pendente' && <EditOutlined  className='task_card__edit' onClick={()=>showModal()}/>}
          <div className={`task_card__status ${props.status === 'pendente' ? 'pending' : 'completed'}`} >
          {
            status === 'pendente' ?
            <Popconfirm title="Concluir tarefa"
              description="Deseja concluir esta tarefa?"
              onConfirm={confirm}
              okText="Sim"
              cancelText="Não"
            >
              <Button >Concluir</Button>
            </Popconfirm> : <><CheckOutlined /> Concluído </>
          }
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