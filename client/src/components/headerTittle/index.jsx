import { Header } from "antd/es/layout/layout";
import { ContainerTittle } from "../containerTittle";
import './header-tittle-styles.css'

export function HeaderTittle(){
    return(
        <Header className="header_tittle">
            <ContainerTittle tittle="Minhas tarefas"/> 
        </Header>
    )
}