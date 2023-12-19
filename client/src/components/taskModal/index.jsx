import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { updateTaskDetails } from "../../store/slice/task";

export function TaskModal({typeModal,isModalOpen,handleOk,handleCancel,taskId,taskName,taskDescription,taskStatus,}) {
    const dispatch = useDispatch()
    const [newTaskName, setNewTaskName] = useState(taskName);
    const [newTaskDescription, setNewTaskDescription] = useState(taskDescription|| null);
    const [newTaskStatus, setNewTaskStatus] = useState(taskStatus || 'pendente');
    const [pendingPhoto, setPendingPhoto] = useState(null); 
    const [error, setError] = useState(false)
    const tittleModal = typeModal === 'edit' ? "Editar tarefa" : "Cadastrar tarefa";

    const normFile = (e) => {
        return Array.isArray(e) ? e : e?.fileList;
    };
    let task = {
        name: newTaskName,
        description: newTaskDescription,
        status: newTaskStatus           
    };
    
    const handleSaveTask = async() => {
     
        if (!task?.name || !task?.description ){
            setError(true);
            return;
        }
        if (typeModal === 'edit') task = {...task, id: taskId};        
        
        const method = typeModal === 'edit' ? 'PUT' : 'POST';
        await fetch(process.env.REACT_APP_TASK_URI, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })   
        .then((response) => response?.json())    
        .then((response) => {   
            if(pendingPhoto?.name){                
                const idTask = response.id
                const formData = new FormData();
                formData.append('file', pendingPhoto);                
                fetch(`${process.env.REACT_APP_TASK_UP}/${idTask}`, {
                    method: 'POST',
                    body: formData
                })
                .finally(()=>handleOk())
                .catch(error => {
                    console.error('Erro ao enviar imagem:', {error});
                });
                dispatch(updateTaskDetails(formData))
            }
            dispatch(updateTaskDetails(task))
            handleOk()
        })
        .catch(error => {
            console.error('Erro :', error);
        })
    };
 
    return (
        <Modal title={tittleModal} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>Cancelar</Button>,
            <Button key="submit" type="primary"    onClick={handleSaveTask}>Salvar</Button>
          ]}
        >
            <Typography.Title level={5} style={{marginTop: 16}}>Nome</Typography.Title>            
            {error  && <span style={{color:'red'}}>* Por favor, preencha o nome da tarefa</span>}
            <Input enterButton placeholder="Nome da tarefa" value={newTaskName} onChange={(e) =>setNewTaskName(e.target.value)} />
            
            <Typography.Title level={5} style={{marginTop: 16}}>Descrição</Typography.Title>
            {error  && <span style={{color:'red'}}>* Por favor, preencha o nome da tarefa</span>}
            <TextArea placeholder="Descreva a tarefa" value={newTaskDescription} onChange={(e) =>setNewTaskDescription(e.target.value)} />

            <Typography.Title style={{marginTop: 16}} level={5}>Status</Typography.Title>
            <Select style={{width:'100%'}}
                labelInValue
                defaultValue={{ value: newTaskStatus, label: newTaskStatus }}
                disabled={typeModal === 'edit' ? false : true}  
                onChange={(e) => {if (typeModal === 'edit') setNewTaskStatus(e.label)}} 
                options={[ { value: 'pendente', label: 'pendente' }, { value: 'concluido', label: 'concluido' }] }
            />
            <Form style={{marginTop: 16}}>
                <Form.Item
                    name="imagem"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Por favor, selecione uma imagem' }]}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        onChange={(info) => setPendingPhoto(info.file.originFileObj)}
                    >
                        <Button icon={<UploadOutlined />}>Imagem</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );}