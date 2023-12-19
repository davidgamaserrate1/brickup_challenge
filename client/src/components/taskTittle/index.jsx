import './task-tittle-styles.css'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Badge, Button, Tooltip } from 'antd'
import Ribbon from 'antd/es/badge/Ribbon';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountCompletedTasks, selectCountPendingTasks } from '../../store/slice/task';
import { saveTaskModal } from '../../store/slice/modal';

export function TaskTittle({ description , type }){
  const dispatch = useDispatch()
  
  const showModal = () => {
    const task = {
      isOpen: true,
      titleModal:"Cadastrar tarefa" ,
    }
    dispatch(saveTaskModal(task))
  };
  
  const countPendingTasks   = useSelector( selectCountPendingTasks )
  const countCompletedTasks = useSelector( selectCountCompletedTasks )

  return(
    <Badge count={type=== 'pending'? countPendingTasks: countCompletedTasks}>
      <Tooltip className='task_card__edit' title="Editar tarefa"><EditOutlined onClick={()=>showModal()}/></Tooltip>  
      <Ribbon text={description} style={{fontSize:'18px'}} color={type=== 'pending'? 'blue': 'green'} >      
        <div className='task_tittle'> {type=== 'pending' && 
          <Tooltip  title="Adicionar tarefa"> 
            <Button disabled={type !=='pending'} type="primary" shape="circle" icon={<PlusOutlined />} 
              onClick={()=>showModal()}
              />
          </Tooltip>}
        </div> 
      </Ribbon> 
    </Badge>
  )
}