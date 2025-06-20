# Estágio 1: Dependências
FROM node:20-alpine AS deps

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci --only=production

# Estágio 2: Build
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências do estágio anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio 3: Runtime
FROM node:20-alpine AS runtime

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de build do Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expor porta
EXPOSE 3000

# Definir variáveis de ambiente
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Executar a aplicação
CMD ["node", "server.js"]