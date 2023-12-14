import { PlusOutlined } from '@ant-design/icons'
import './task-tittle-styles.css'
import { Button, Form, Modal, Typography, Upload } from 'antd'
import { useState } from 'react';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

export function TaskTittle({ description , type }){

  const [taskName, setTaskName] =useState()
  const [taskDescription, setTaskDescription]=useState()
  const [taskPhoto, setTaskPhoto]=useState('none')
  const [taskStatus, setTaskStatus]= useState('pendente')

  async function saveTask(){
    const task = {
      name : taskName,
      description :taskDescription,
      status: taskStatus,
      photo :taskPhoto 
    }
    const SEND_URL = process.env.REACT_APP_TASK_URI;
    await fetch(SEND_URL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(()=>window.location.reload())
    // .then((response)=>console.log('response 2 ' + response))
  }



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

  const normFile = (e) => {
      if (Array.isArray(e))  
        return e 
        
      return e?.fileList;
    };

    return(
       <>
        <div className='task_tittle'> 
            <div>{description}</div>
            {type ==='pending' && <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal}/>}
        </div>
         
        <Modal title="Cadastrar atividade" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={saveTask}>
              Salvar
            </Button>]}
        >
            <Typography.Title level={5} style={{marginTop:16}} >Nome</Typography.Title>
            <Input placeholder="Nome da tarefa" value={taskName} onChange={(e)=> setTaskName(e.target.value)} />
           
            <Typography.Title level={5} style={{marginTop:16}} >Descrição</Typography.Title>
            <TextArea placeholder="Descreva a tarefa" value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)} />
           
            <Typography.Title style={{marginTop:16}} level={5}>Status</Typography.Title>
            <Input value={taskStatus} disabled />
           
            <Form.Item
                style={{marginTop:16}}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                
            >
                <Upload  name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Imagem</Button>
                </Upload>
            </Form.Item>

          
        </Modal>

        </>
    )
}