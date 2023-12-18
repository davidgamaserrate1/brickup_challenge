import { PlusOutlined } from '@ant-design/icons'
import './task-tittle-styles.css'
import { Avatar, Badge, Button } from 'antd'
import { useState } from 'react';
import { TaskModal } from '../taskModal';

export function TaskTittle({ description , type }){
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

  return(
      <>
        <Badge.Ribbon text= {description} color={type=== 'pending'? 'blue': 'green'} >
          <div className='task_tittle'> 
            <Button disabled={type !=='pending'} type="primary" shape="circle" 
              icon={<PlusOutlined />} 
              onClick={()=>showModal()} 
            />
         </div>  
          
         </Badge.Ribbon> 

        <TaskModal 
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          />
      </>
  )
}