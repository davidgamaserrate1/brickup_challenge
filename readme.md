# Desafio Técnico - Brickup

Este é um exemplo de API de Tarefas desenvolvida como parte do desafio técnico proposto pela Brickup. Esta parte corresponde ao back-end da aplicação 

## Entidade Task

A entidade `Task` representa uma tarefa com os seguintes campos:

- `id` (Long): Identificador único da tarefa.
- `name` (String): Nome da tarefa.
- `description` (String): Descrição da tarefa.
- `status` (String): Status atual da tarefa.
- `photo` (String): URL da foto relacionada à tarefa.

## Métodos Disponíveis

### Listar Todas as Tarefas
- **Endpoint:** `GET /task`
- **Descrição:** Retorna uma lista de todas as tarefas cadastradas.
- **Exemplo de Uso:** `http://localhost:8080/task`

### Adicionar uma Nova Tarefa
- **Endpoint:** `POST /task`
- **Descrição:** Adiciona uma nova tarefa.
- **Corpo da Requisição:** Deve conter os detalhes da tarefa a ser adicionada no formato JSON, incluindo os campos `name`, `description`, `status` e `photo`.
- **Exemplo de Uso:** 
    ```json
    {
        "name": "Nome da Tarefa",
        "description": "Descrição da tarefa",
        "status": "Em andamento",
        "photo": "URL_da_imagem"
    }
    ```

### Atualizar uma Tarefa Existente
- **Endpoint:** `PUT /task`
- **Descrição:** Atualiza uma tarefa existente com base no ID fornecido.
- **Corpo da Requisição:** Deve conter os detalhes atualizados da tarefa no formato JSON, incluindo os campos `id`, `name`, `description`, `status` e `photo`.
- **Exemplo de Uso:** 
    ```json
    {
        "id": 1,
        "name": "Nome atualizado da tarefa",
        "description": "Nova descrição da tarefa",
        "status": "Concluída",
        "photo": "URL_da_nova_imagem"
    }
    ```