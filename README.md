# 🐳 Lista de Tarefas (To-Do List) - Docker

Aplicação completa de gerenciamento de tarefas com backend em Spring Boot, frontend em Next.js e banco PostgreSQL, todos executando em containers Docker.

## 🚀 Como Executar com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Executando a Aplicação

1. **Clone o repositório:**
```bash
git clone https://github.com/01Rian/ToDo-List-App
cd Todo-Test
```

2. **Execute com Docker Compose:**
```bash
docker-compose up -d
```

3. **Acesse as aplicações:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Banco PostgreSQL**: localhost:5432

### 🛑 Parando a Aplicação

```bash
docker-compose down
```

Para remover também os volumes (dados do banco):
```bash
docker-compose down -v
```

## 📋 Serviços Incluídos

### 🗄️ PostgreSQL
- **Container**: `todolist-postgres`
- **Porta**: 5432
- **Banco**: `todolist`
- **Usuário**: `todouser`
- **Senha**: `todopass`

### 🔧 API Backend
- **Container**: `todolist-api`
- **Porta**: 8080
- **Tecnologia**: Spring Boot + Java 17
- **Profile**: `docker`

### 🌐 Frontend
- **Container**: `todolist-frontend`
- **Porta**: 3000
- **Tecnologia**: Next.js + React + TypeScript

## 🔍 Verificando o Status

Verificar se os containers estão rodando:
```bash
docker-compose ps
```

Ver logs de um serviço específico:
```bash
docker-compose logs frontend
docker-compose logs api
docker-compose logs postgres
```

Ver logs em tempo real:
```bash
docker-compose logs -f
```

## 🛠️ Comandos Úteis

### Rebuild dos containers
```bash
docker-compose up --build
```

### Executar apenas um serviço
```bash
docker-compose up postgres
```

### Acessar shell de um container
```bash
docker-compose exec api bash
docker-compose exec frontend sh
docker-compose exec postgres psql -U todouser -d todolist
```

### Restart de um serviço
```bash
docker-compose restart api
```

## 🔄 Health Checks

Todos os serviços possuem health checks configurados:
- **PostgreSQL**: Verifica se o banco está aceitando conexões
- **API**: Verifica endpoint `/actuator/health`
- **Frontend**: Inicia após a API estar saudável

## 📊 Monitoramento

A API inclui endpoints de monitoramento via Spring Boot Actuator:
- http://localhost:8080/actuator/health

---

**Lista de Tarefas** - Executando com Docker 🐳