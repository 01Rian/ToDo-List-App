# 🌐 Frontend Lista de Tarefas (To-Do List)

Interface web moderna e responsiva para gerenciamento de lista de tarefas, desenvolvida com Next.js, React e TypeScript.

## 🚀 Funcionalidades

- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir tarefas
- 🔍 **Sistema de Filtros**: Filtrar por status e buscar por palavras-chave
- 📱 **Design Responsivo**: Interface adaptável para diferentes dispositivos
- 🎨 **Interface Moderna**: Design limpo e intuitivo com Tailwind CSS
- ⚡ **Performance**: Otimizado com Next.js 15 e Turbopack
- 🔄 **Atualizações em Tempo Real**: Interface reativa às mudanças
- 🌈 **Indicadores Visuais**: Cores distintas para cada status de tarefa

## 🏗️ Estrutura da Interface

### Componentes Principais

- **TaskCard**: Cartão individual de tarefa com informações resumidas
- **TaskDetailModal**: Modal para visualização e edição detalhada
- **CreateTaskForm**: Formulário para criação de novas tarefas
- **TaskFilters**: Componente de filtros e busca

### Estados de Tarefa

Cada tarefa é exibida com indicadores visuais baseados em seu status:

- 🔴 **NÃO INICIADO**: Tarefas ainda não começadas
- 🟡 **EM ANDAMENTO**: Tarefas em progresso
- 🟢 **CONCLUÍDO**: Tarefas finalizadas

## 🎨 Interface

### Página Principal
- Lista de tarefas em formato de cards
- Barra de filtros e busca no topo
- Botão flutuante para criar nova tarefa
- Estados de loading e erro bem definidos

### Modal de Detalhes
- Visualização completa da tarefa
- Edição inline de todos os campos
- Botões de ação (salvar, cancelar, excluir)
- Validação de formulário

### Filtros Disponíveis
- **Status**: Filtrar por NAO_INICIADO, EM_ANDAMENTO, CONCLUIDO
- **Busca**: Pesquisar por palavras-chave no título ou descrição
- **Combinação**: Usar filtros em conjunto para busca refinada

## 🔧 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Executando a Aplicação

1. **Clone o repositório:**
```bash
git clone https://github.com/01Rian/ToDo-List-App
cd Todo-Test
```

2. **Navegue até o diretório do frontend:**
```bash
cd frontend
```

3. **Instale as dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

4. **Configure as variáveis de ambiente:**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite as variáveis conforme necessário
# .env.local já contém a configuração padrão para desenvolvimento
```

5. **Execute a aplicação em modo desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

6. **A aplicação estará disponível em:**
```
http://localhost:3000
```

### 🔨 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com Turbopack
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linting do código

## ⚙️ Configuração de Variáveis de Ambiente

A aplicação utiliza variáveis de ambiente para configurar a URL da API do backend.

### Arquivos de Ambiente
- `.env.local` - Configurações para desenvolvimento local
- `.env.production` - Configurações para produção
- `.env.example` - Exemplo de configuração (versionado no Git)

### Variáveis Disponíveis
```bash
# URL base da API do backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/tasks
```

> **Nota**: O prefixo `NEXT_PUBLIC_` é necessário para que a variável seja disponibilizada no lado cliente (browser).

### Como Configurar
1. Copie o arquivo `.env.example` para `.env.local`
2. Ajuste a URL da API conforme seu ambiente
3. Reinicie o servidor de desenvolvimento

## 🌐 Integração com Backend

A aplicação frontend consome a API REST do backend através do serviço `TaskService`:

### Configuração da API
```typescript
// Base URL da API (configurável via variável de ambiente)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/tasks';
```

### Endpoints Consumidos
- `GET /api/tasks` - Listar tarefas com filtros
- `GET /api/tasks/{id}` - Buscar tarefa específica
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa completa
- `PATCH /api/tasks/{id}/status` - Atualizar apenas status
- `DELETE /api/tasks/{id}` - Excluir tarefa

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globais
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Página inicial
│   ├── components/
│   │   ├── CreateTaskForm.tsx   # Formulário de criação
│   │   ├── TaskCard.tsx         # Card de tarefa
│   │   ├── TaskDetailModal.tsx  # Modal de detalhes
│   │   └── TaskFilters.tsx      # Componente de filtros
│   ├── services/
│   │   └── taskService.ts       # Cliente da API
│   ├── types/
│   │   └── task.ts             # Tipos TypeScript
│   └── utils/
│       └── dateUtils.ts        # Utilitários de data
├── package.json
├── tailwind.config.ts          # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
└── next.config.ts             # Configuração Next.js
```

## 🎯 Funcionalidades Detalhadas

### ✅ Criação de Tarefas
- Formulário modal com validação
- Campos: título, descrição e status inicial
- Validação em tempo real
- Feedback visual de loading

### 👁️ Visualização de Tarefas
- Cards organizados em grid responsivo
- Informações essenciais visíveis
- Indicadores de status com cores
- Data de criação formatada

### ✏️ Edição de Tarefas
- Modal de detalhes com edição inline
- Todos os campos editáveis
- Salvamento automático com confirmação
- Validação de dados antes do envio

### 🗑️ Exclusão de Tarefas
- Confirmação antes da exclusão
- Feedback visual da ação
- Atualização automática da lista

### 🔍 Sistema de Filtros
- Busca em tempo real por texto
- Filtros por status
- Combinação de múltiplos filtros
- URL state para compartilhamento

## 📚 Tecnologias Utilizadas

- **Next.js 15.3.4** - Framework React com SSR
- **React 19** - Biblioteca de interface
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **ESLint** - Linting de código

## 🎨 Design System

### Cores Principais
- **Primária**: Azul (#3B82F6)
- **Sucesso**: Verde (#10B981) 
- **Atenção**: Amarelo (#F59E0B)
- **Perigo**: Vermelho (#EF4444)
- **Neutro**: Cinza (#6B7280)

### Tipografia
- **Font Family**: Geist (otimizada pelo Next.js)
- **Tamanhos**: Sistema responsivo do Tailwind

### Componentes Reutilizáveis
- Botões com variações de estilo
- Cards com sombras e hover effects
- Modals com backdrop blur
- Inputs com validação visual

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Adaptações por Dispositivo
- Grid responsivo para cards de tarefas
- Menu hambúrguer em telas pequenas
- Modals adaptáveis ao tamanho da tela
- Botões e inputs otimizados para touch

## 🚀 Performance

### Otimizações Implementadas
- **Turbopack**: Bundler ultra-rápido para desenvolvimento
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Otimização automática de imagens
- **Font Optimization**: Carregamento otimizado de fontes
- **React 19**: Recursos de performance mais recentes

### 📋 Padrões de Código

- **TypeScript**: Tipagem obrigatória
- **ESLint**: Seguir regras do Next.js
- **Componentes**: Usar function components com hooks
- **CSS**: Utilizar classes do Tailwind
- **Nomeação**: camelCase para variáveis, PascalCase para componentes

---

**Frontend Lista de Tarefas** - Desenvolvido com ❤️ e Next.js
