import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export function TaskModal({
    typeModal,
    isModalOpen, 
    handleOk, 
    handleCancel,
    taskId,
    taskName,
    taskPhoto,
    taskDescription,
    taskStatus,
}){
    const [newTaskName, setNewTaskName] = useState(taskName)
    const [newTaskDescription, setNewTaskDescription] = useState(taskDescription)
    const [newTaskStatus, setNewTaskStatus] = useState(taskStatus || 'pendente')
    const [newTaskPhoto, setNewTaskPhoto] = useState(taskPhoto)
 
    const tittleModal = typeModal ==='edit' ? "Editar tarefa" : "Cadastrar tarefa"
    
    const normFile = (e) => {
        if (Array.isArray(e))  
            return e 
            
        return e?.fileList;
    };

    async function saveTask(){
        let task 
        
        task = {
            name : newTaskName,
            description :newTaskDescription,
            status: newTaskStatus,
            photo :newTaskPhoto 
        }  

        if(typeModal === 'edit') 
            task = {...task, id:taskId }
        
        const SEND_URL = process.env.REACT_APP_TASK_URI;
        const method = typeModal === 'edit' ? 'PUT' : 'POST'

        await fetch(SEND_URL, {
            method: method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })       
        .finally( handleOk )
    
    }

    return(
        <Modal title={tittleModal} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={saveTask}>
              Salvar
            </Button>]}
        >
            <Typography.Title level={5} style={{marginTop:16}} >Nome</Typography.Title>
            <Input placeholder="Nome da tarefa" value={newTaskName} onChange={(e)=> setNewTaskName(e.target.value)} />
           
            <Typography.Title level={5} style={{marginTop:16}} >Descrição</Typography.Title>
            <TextArea placeholder="Descreva a tarefa" value={newTaskDescription} onChange={(e)=>setNewTaskDescription(e.target.value)} />
           
            <Typography.Title style={{marginTop:16}} level={5}>Status</Typography.Title>
            <Select
                labelInValue
                defaultValue={{ value:newTaskStatus, label: newTaskStatus}}
                disabled={typeModal ==='edit' ? false : true}  
                onChange={(e)=>{if(typeModal ==='edit') setNewTaskStatus(e.label)}} 
                options={[
                    {value: 'pendente',  label: 'pendente',},
                    {value: 'concluido', label: 'concluido',},
                ]}
            />
           
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
    )
}