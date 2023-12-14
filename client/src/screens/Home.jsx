import React, { useEffect, useState } from "react";
 
import './home-styles.css'
import { TaskCard } from "../components/taskCard";
import { ContainerTittle } from "../components/containerTittle";
import { TaskTittle } from "../components/taskTittle";

import { Input, Layout, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;

export function Home(){  
    const [ tasks, setTasks] = useState([])

    const TASK_URI = process.env.REACT_APP_TASK_URI;
    
    const  getTasks = async() =>{
        await 
            fetch(TASK_URI)
            .then((response)=>response.json())
            .then((response)=>setTasks(response))
    }
    
    useEffect(()=>{
        getTasks()
    },[])
    
    const { token: { colorBgContainer }} = theme.useToken();


    const renderTasks = (status) => {
        return tasks
          .filter(task => task.status === status)
          .map(task => (
            <TaskCard key={task.id}/>
          ));
      };

      
return (
    <Layout  className="home_layout"> 
        <Content className="home_content">
            <div  className="content_dashboard" style={{background:colorBgContainer}} >
                <ContainerTittle tittle="Minhas tarefas"/>
                <div className="search_task" >
                    <Input  size="large" placeholder="Pesquisar por nome" prefix={<SearchOutlined />} />
                </div>

                <div className="task_group">
                    <div className="task_group__pending"> 
                        <TaskTittle description="pendentes" type="pending" /> 
                        {renderTasks('pendente')} 
                    </div>
                    
                    <div  className="task_group__completed"> 
                        <TaskTittle description="Finalizadas" type="completed" />                         
                        {renderTasks('concluido')}  
                    </div>
                </div>
            </div>
        </Content>
    </Layout>
)}

 