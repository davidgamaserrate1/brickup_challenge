# Desafio Técnico - Brickup

### Repositório para disponibilização da resolução da prova tecnica

</br>

###  O projeto desenvolvido conta com um design realizado no Figma - [Visualizar](https://www.figma.com/file/Ac4hZCAbQ65sjxi48bj8l2/Brickup---Tarefas?type=design&node-id=0-1&mode=design)
---
## 🎨 Funcionalidades
> Principais serviços disponiveis no sistema:
- Cadastrar atividade
- Editar atividade

## 💻 Pré-requisitos

> Antes de começar, verifique se você atendeu aos seguintes requisitos:

* [Versão mais recente do `Node` .](https://nodejs.org/en/download)
* [Apache Maven 4.0.0](https://maven.apache.org/download.cgi)
* [Java 21](https://www.oracle.com/br/java/technologies/downloads/)

## ✨ Iniciar a aplicação 
> **Parte 1** - Baixe o código do repositório (usando o `GIT`)  
```bash
    git clone https://github.com/davidgamaserrate1/brickup_challenge.git
    cd brickup_challenge
```
 
 **Parte 2** - executar o backend spring boot
```bash
 mvn spring-boot:run

```

**Parte 3** - Instalar as dependências do front-end
```bash
cd client
npm install 
```
**Parte 4** - Iniciar aplicação front end
```bash

npm start 
```
---
 
## Portas das aplicações

| app        | port |
| ---------- | ---- |
| front-end  | 3000 |
| back-end   | 8080 |

---
<br>

## Back-end - Métodos Disponíveis

### Listar Todas as Tarefas
- **Endpoint:** `GET /task`
- **Descrição:** Retorna uma lista de todas as tarefas cadastradas.
- **Exemplo de Uso:** `http://localhost:8080/task`

### Adicionar uma Nova Tarefa
- **Endpoint:** `POST /task`
- **Descrição:** Adiciona uma nova tarefa. Se o status estiver vazio, será salvo como "pendente" como padrão
- **Corpo da Requisição:** Deve conter os detalhes da tarefa a ser adicionada no formato JSON, incluindo os campos `name`, `description`, `status`(opcional)
- **Exemplo de Uso:** 
    ```json
    {
        "name": "Nome da Tarefa",
        "description": "Descrição da tarefa",
        "status": "concluido"
    }
    ```
### Adicionar imagem para uma tarefa
- **Endpoint:** `POST /task/upload/{taskId}`
- **Descrição:** Adiciona imagem para uma tarefa.
- **Corpo da Requisição:**  deve ser enviado um arquivo form-data, com a key 'file', contendo uma imagem
- **Exemplo de Uso:**     
```bash
    Content-Type: multipart/form-data
```

### Atualizar uma Tarefa Existente
- **Endpoint:** `PUT /task`
- **Descrição:** Atualiza uma tarefa existente com base no ID fornecido no corpo da requisição.
- **Corpo da Requisição:** Deve conter os detalhes atualizados da tarefa no formato JSON, incluindo os campos `id` (obrigatório), `name`, `description`, `status` e `photo`.
- **Exemplo de Uso:** 
    ```json
    {
        "id": 1,
        "name": "Nome atualizado da tarefa",
        "description": "Nova descrição da tarefa",
        "status": "Concluída" 
    }
    ```
### Visualizar imagem da task
- **Endpoint:** `GET /images`
- **Descrição:** Retorna a imagem salva no campo photo da task.
- **Exemplo de Uso:** `http://localhost:8080/images/uploads/{imageName}`
