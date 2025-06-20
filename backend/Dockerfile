# Estágio 1: Build
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar pom.xml primeiro para aproveitar o cache do Docker para dependências
COPY pom.xml .

# Baixar dependências
RUN mvn dependency:go-offline -B

# Copiar código fonte
COPY src ./src

# Construir a aplicação
RUN mvn clean package -DskipTests

# Estágio 2: Runtime
FROM eclipse-temurin:17-jre-alpine AS runtime

# Definir diretório de trabalho
WORKDIR /app

# Copiar o JAR construído do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]