import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskDetails } from "../../store/slice/task";
import { removeTaskModal, selectTaskModal } from "../../store/slice/modal";

export function TaskModal() {   
    const taskModal = useSelector(selectTaskModal)
    const [sended, setSended]= useState(false)
    const [newTaskName, setNewTaskName] = useState(taskModal.name);
    const [newTaskDescription, setNewTaskDescription] = useState(taskModal.description);
    const [newTaskStatus, setNewTaskStatus] = useState(taskModal.status || 'pendente');
    const [pendingPhoto, setPendingPhoto] = useState(undefined); 
    const [error, setError] = useState(false)
    const tittleModal = taskModal.titleModal;

    const dispatch = useDispatch()
    const handleClose = () =>{
        setSended(true)
        dispatch(removeTaskModal())  
    }
    useEffect(() => {
        setNewTaskName(taskModal.name || '');
        setNewTaskDescription(taskModal.description || '');
        setNewTaskStatus(taskModal.status || 'pendente');        
    }, [taskModal,sended]);  

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
        if (taskModal.typeModal === 'edit') task = {...task, id: taskModal.taskId};
        
        const method = taskModal.typeModal === 'edit' ? 'PUT' : 'POST';
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
                .finally(()=>handleClose())
                .catch(error => {
                    console.error('Erro ao enviar imagem:', {error});
                });
                dispatch(updateTaskDetails(formData))
            }
            dispatch(updateTaskDetails(task))
            handleClose()
        })
        .catch(error => {
            console.error('Erro :', error);
        })
        setSended(true)

    };
 
    return (
        <Modal   title={tittleModal} open={ taskModal.isOpen }  onOk={ handleClose} onCancel={ handleClose}
          footer={[
            <Button key="back" onClick={handleClose}>Cancelar</Button>,
            <Button key="submit" type="primary"    onClick={handleSaveTask}>Salvar</Button>
          ]}
        >
            <Typography.Title level={5} style={{marginTop: 16}}>Nome</Typography.Title>            
            {error  && <span style={{color:'red'}}>* Por favor, preencha o nome da tarefa</span>}
            <Input enterButton placeholder="Nome da tarefa" value={newTaskName} onChange={(e) =>setNewTaskName(e.target.value)} />
            
            <Typography.Title level={5} style={{marginTop: 16}}>Descrição</Typography.Title>
            {error  && <span style={{color:'red'}}>* Por favor, preencha a descrição da tarefa</span>}
            <TextArea placeholder="Descreva a tarefa" value={newTaskDescription} onChange={(e) =>setNewTaskDescription(e.target.value)} />

            <Typography.Title style={{marginTop: 16}} level={5}>Status</Typography.Title>
            <Select style={{width:'100%'}}
                labelInValue
                defaultValue={{ value: newTaskStatus, label: newTaskStatus }}
                disabled={taskModal.typeModal === 'edit' ? false : true}  
                onChange={(e) => {if (taskModal.typeModal === 'edit') setNewTaskStatus(e.label)}} 
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
