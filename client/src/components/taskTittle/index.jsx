import { PlusOutlined } from '@ant-design/icons'
import './task-tittle-styles.css'
import { Button } from 'antd'


export function TaskTittle({ description }){
    return(
        <div className='task_tittle'> 
            <div>{description}</div>
            <Button type="primary" shape="circle" icon={<PlusOutlined />}   />
        </div>
    )
}