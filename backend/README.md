# 📝 API de Lista de Tarefas (To-Do List)

Uma API REST completa para gerenciamento de lista de tarefas, desenvolvida com Spring Boot e Java 17.

## 🚀 Funcionalidades

- ✅ **CRUD Completo**: Criar, listar, atualizar e excluir tarefas
- 🔍 **Sistema de Filtros**: Filtrar por status e buscar por palavras-chave
- 📊 **Persistência**: Dados armazenados em banco H2 (em memória)
- 🛡️ **Validação**: Validação de dados de entrada
- 🌐 **CORS**: Configurado para aceitar requisições de qualquer origem
- 📋 **Dados de Exemplo**: Carregamento automático de tarefas para demonstração

## 🏗️ Estrutura da Tarefa

Cada tarefa possui os seguintes campos:

```json
{
  "id": 1,
  "titulo": "Título da tarefa",
  "descricao": "Descrição detalhada da tarefa",
  "status": "NAO_INICIADO", // NAO_INICIADO, EM_ANDAMENTO, CONCLUIDO
  "dataCriacao": "2025-01-18T22:30:00"
}
```

## 📡 Endpoints da API

### Base URL
```
http://localhost:8080/api/tasks
```

### 1. Listar Todas as Tarefas
```http
GET /api/tasks
```

**Parâmetros de Query (opcionais):**
- `status`: Filtrar por status (`NAO_INICIADO`, `EM_ANDAMENTO`, `CONCLUIDO`)
- `keyword`: Buscar por palavra-chave no título ou descrição

**Exemplos:**
```http
GET /api/tasks
GET /api/tasks?status=EM_ANDAMENTO
GET /api/tasks?keyword=API
GET /api/tasks?status=NAO_INICIADO&keyword=teste
```

### 2. Buscar Tarefa por ID
```http
GET /api/tasks/{id}
```

### 3. Criar Nova Tarefa
```http
POST /api/tasks
Content-Type: application/json

{
  "titulo": "Nova tarefa",
  "descricao": "Descrição da nova tarefa",
  "status": "NAO_INICIADO"
}
```

### 4. Atualizar Tarefa
```http
PUT /api/tasks/{id}
Content-Type: application/json

{
  "titulo": "Título atualizado",
  "descricao": "Nova descrição",
  "status": "EM_ANDAMENTO"
}
```

### 5. Excluir Tarefa
```http
DELETE /api/tasks/{id}
```

### 6. Listar Status Disponíveis
```http
GET /api/tasks/status
```

### 7. Atualizar Apenas o Status
```http
PATCH /api/tasks/{id}/status
Content-Type: application/json

"CONCLUIDO"
```

## 🔧 Como Executar

### Pré-requisitos
- Java 17
- Maven

### Executando a Aplicação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd Todo-Test
```

2. **Navegue até o diretório do backend:**
```bash
cd backend
```

3. **Execute a aplicação:**
```bash
./mvnw spring-boot:run
```

4. **A API estará disponível em:**
```
http://localhost:8080
```

### 🗄️ Console do H2 Database

Para visualizar os dados no banco H2:

1. Acesse: http://localhost:8080/h2-console
2. Configure a conexão:
   - **JDBC URL**: `jdbc:h2:mem:todolist`
   - **User Name**: `sa`
   - **Password**: `password`

## 📋 Exemplos de Uso

### Criar uma nova tarefa
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Aprender conceitos avançados do Spring Boot",
    "status": "NAO_INICIADO"
  }'
```

### Listar tarefas em andamento
```bash
curl "http://localhost:8080/api/tasks?status=EM_ANDAMENTO"
```

### Buscar tarefas por palavra-chave
```bash
curl "http://localhost:8080/api/tasks?keyword=API"
```

### Atualizar status de uma tarefa
```bash
curl -X PATCH http://localhost:8080/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '"CONCLUIDO"'
```

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas:

- **Controller**: Endpoints REST
- **Service**: Lógica de negócio
- **Repository**: Acesso a dados
- **Model**: Entidades JPA
- **DTO**: Objetos de transferência de dados

## 🧪 Dados de Teste

A aplicação carrega automaticamente 5 tarefas de exemplo ao iniciar:

1. **Implementar API de Tarefas** (CONCLUIDO)
2. **Criar Sistema de Filtros** (EM_ANDAMENTO)
3. **Documentar API** (NAO_INICIADO)
4. **Implementar Testes Unitários** (NAO_INICIADO)
5. **Configurar Deploy** (NAO_INICIADO)

## 📚 Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.5.0**
- **Spring Data JPA**
- **H2 Database**
- **Lombok**
- **Maven**

## 🎯 Status da Aplicação

✅ **Funcionalidades Implementadas:**
- [x] CRUD completo de tarefas
- [x] Filtros por status
- [x] Busca por palavras-chave
- [x] Validação de dados
- [x] Tratamento de exceções
- [x] Dados de exemplo
- [x] Documentação completa

---

**API de Lista de Tarefas** - Desenvolvida com ❤️ e Java