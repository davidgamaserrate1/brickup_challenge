import { PlusOutlined } from '@ant-design/icons'
import './task-tittle-styles.css'
import { Button } from 'antd'
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
        <div className='task_tittle'> 
          <div>{description}</div>
          {type ==='pending' && <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={()=>showModal()} />}
        </div>

        <TaskModal 
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </>
  )
}