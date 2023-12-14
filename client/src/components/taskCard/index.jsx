import { Card,  } from 'antd'
import './task-card-styles.css'
import {EditOutlined} from '@ant-design/icons';

import stageImg from './task_2_task.png'

export function TaskCard(){
    const props ={
        name : "Tarefa a",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit",
        status: "pendente",
        photo: "pendente"
    }

    return(
        <Card title={props.name}    className='task_card'>            
            <EditOutlined  className='task_card__edit'/> 
            <div className={`task_card__status ${props.status === 'pendente' ? 'pending' : 'completed'}  } `} > {props.status} </div>
            <div className="task_card_info">
                <div className="task_card_img__div">
                    <img className="task_card_img" src={stageImg} alt='imag' />
                </div>
                <div  className='task_card__description'> {props.description} </div>
            </div>
            
        </Card>
    )
}