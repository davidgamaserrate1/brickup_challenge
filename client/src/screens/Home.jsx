import React from "react";
 
import './home-styles.css'
import { TaskCard } from "../components/taskCard";
import { ContainerTittle } from "../components/containerTittle";
import { TaskTittle } from "../components/taskTittle";

import { Input, Layout, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;

export function Home(){  

const { token: { colorBgContainer }} = theme.useToken();

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
                        <TaskTittle description="pendentes" /> 
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                    
                    <div  className="task_group__completed"> 
                        <TaskTittle description="concluídos" /> 
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                </div>
            </div>
        </Content>
    </Layout>
)}

 