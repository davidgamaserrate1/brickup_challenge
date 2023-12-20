import './task-card-styles.css'
import { Button, Card, Image, Popconfirm, Tooltip, message,  } from 'antd'
import {CheckOutlined, EditOutlined} from '@ant-design/icons';
import defaultImage from '../../uploads/default_image.png'
import { removeTaskModal, saveTaskModal } from '../../store/slice/modal';
import { useDispatch } from 'react-redux';

export function TaskCard(props){
  const dispatch = useDispatch()

  const task = {
    isOpen: true,
    titleModal : 'Editar tarefa',
    typeModal :'edit',
    taskId : props.id,
    name: props.name,
    description : props.description,
    status : props.status 
  }

  const showModal = () => {
    dispatch(saveTaskModal(task))
  };
  
  const confirm = async() => {
    const taskConclued ={ 
      id: props.id,
      status:'concluido'
    }
    await fetch(process.env.REACT_APP_TASK_URI, {
      method:'PUT',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(taskConclued)
    })
    message.success('Tarefa concluída com sucesso!');
    dispatch(removeTaskModal())  
  };
  
  const taskPhoto = props.photo ? `http://localhost:8080/images/uploads/${props.photo}` : defaultImage
  const status = props.status

  return(
      <Card title={props.name} className='task_card'>            
        {status === 'pendente' && 
        <Tooltip className='task_card__edit' title="Editar tarefa"><EditOutlined onClick={()=>showModal()}/></Tooltip> }
        <div className={`task_card__status ${props.status === 'pendente' ? 'pending' : 'completed'}`} >
          {status === 'pendente' ?
          <Popconfirm title="Concluir tarefa?"
            description="Esta tarefa não poderá ser alterada"
            onConfirm={confirm}
            okText="Sim"
            cancelText="Não"
          >
            <Tooltip title="Concluir tarefa">
              <Button >Concluir</Button>
            </Tooltip>
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
  )}