import './home-styles.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Layout, Pagination } from "antd";
import { TaskCard } from "../components/taskCard";
import { TaskTittle } from "../components/taskTittle";
import { saveTask, selectTasks } from "../store/slice/task";
import {HeaderTittle} from '../components/headerTittle' 
import { selectTaskModal } from '../store/slice/modal';
import { TaskModal } from '../components/taskModal';

export function Home() {  
    const { Content } = Layout; 
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)    
    const taskModal = useSelector(selectTaskModal)

    const startCurrentPage = 1
    const [currentPendingPage, setCurrentPendingPage] = useState(startCurrentPage);
    const [currentCompletedPage, setCurrentCompletedPage] = useState(startCurrentPage);    
    
    const getTasks = async() => {
        try {
            const response = await fetch(process.env.REACT_APP_TASK_URI);
            const data = await response.json();          
            dispatch(saveTask(data))
        } catch (error) { console.error('Erro ao buscar tarefas:', error) }
    };

    useEffect(() => {
        getTasks()
    },[taskModal]);
    
    const tasksPerPage = 3;
    const renderPendingTasks = () => {
        const indexOfLastTask = currentPendingPage * tasksPerPage;
        const indexOfFirstTask = indexOfLastTask - tasksPerPage;
        const pendingTasks = tasks.filter(task => task.status.toLowerCase() === 'pendente');
        const currentPendingTasks = pendingTasks.slice(indexOfFirstTask, indexOfLastTask);
        
        return currentPendingTasks.map(task => (
            <TaskCard id={task.id}
                key={task.id}
                name={task.name}
                description={task.description}
                status={task.status}
                photo={task.photo?.replace(process.env.REACT_APP_UPLOAD_PATH, '')}
            /> 
        ));
    };

    const renderCompletedTasks = () => {
        const indexOfLastTask = currentCompletedPage * tasksPerPage;
        const indexOfFirstTask = indexOfLastTask - tasksPerPage;
        const completedTasks = tasks.filter(task => task.status.toLowerCase() === 'concluido');
        const currentCompletedTasks = completedTasks.slice(indexOfFirstTask, indexOfLastTask);

        return currentCompletedTasks.map(task => (
            <TaskCard key={task.id}
                id={task.id}
                name={task.name}
                description={task.description}
                status={task.status}
                photo={task.photo?.replace(process.env.REACT_APP_UPLOAD_PATH, '')}
            />
        ));
    };

    const handlePendingPageChange = (page) => {
        setCurrentPendingPage(page);
    };

    const handleCompletedPageChange = (page) => {
        setCurrentCompletedPage(page);
    };
    return (
        <>
        <HeaderTittle />
        <Layout className="home_layout"> 
            <Content className="home_content">
                <div className="content_dashboard">
                    <Divider/>
                    <div className="task_group">
                        <div className="task_group__pending"> 
                            <TaskTittle description="Pendentes" type="pending" />                             
                            {renderPendingTasks()} 
                            <Pagination className="task_group__pending__pagination"
                                current={currentPendingPage}
                                defaultCurrent={1}
                                total={tasks.filter(task => task.status === 'pendente').length}
                                pageSize={tasksPerPage}
                                onChange={handlePendingPageChange}
                            />
                            {tasks.filter(task => task.status === 'pendente').length <1 && <div>Nenhuma atividade cadastrada</div>}
                        </div>                         
                        <div className="task_group__completed"> 
                            <TaskTittle description="Finalizadas" type="completed" />
                            {renderCompletedTasks()}  
                            <Pagination className="task_group__pending__pagination"
                                current={currentCompletedPage}
                                defaultCurrent={1}
                                total={tasks.filter(task => task.status === 'concluido').length}
                                pageSize={tasksPerPage}
                                onChange={handleCompletedPageChange}
                            />
                            {tasks.filter(task => task.status === 'concluido').length <1 && <div>Nenhuma atividade finalizada</div>}
                        </div>
                    </div>
                    <Divider/>
                </div>
            </Content>
        </Layout>
        <TaskModal />
        </>        
    );}