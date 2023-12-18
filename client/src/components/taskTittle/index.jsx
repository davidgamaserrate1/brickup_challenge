import { PlusOutlined } from '@ant-design/icons'
import './task-tittle-styles.css'
import { Badge, Button } from 'antd'
import { useState } from 'react';
import { TaskModal } from '../taskModal';
import Ribbon from 'antd/es/badge/Ribbon';
import { useSelector } from 'react-redux';
import { selectCountCompletedTasks, selectCountPendingTasks } from '../../store/slice/task';

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

  const countPendingTasks = useSelector( selectCountPendingTasks )
  const countCompletedTasks = useSelector( selectCountCompletedTasks )

  return(
      <>
        <Badge count={type=== 'pending'? countPendingTasks: countCompletedTasks}>
        <Ribbon text={description} color={type=== 'pending'? 'blue': 'green'} >
          <div className='task_tittle'> 
            {type=== 'pending' && <Button disabled={type !=='pending'} type="primary" shape="circle" 
              icon={<PlusOutlined />} 
              onClick={()=>showModal()} 
            />}
          </div>  
        </Ribbon> 
        </Badge>

        <TaskModal 
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          />
      </>
  )
}