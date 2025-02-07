# FiapPosTechChallengeGroup17

# Projeto Web API .NET 9 com Entity Framework

## Visão Geral
Este projeto é uma API desenvolvida em .NET 9 utilizando Entity Framework Core para interação com banco de dados.

## Tecnologias Utilizadas
- .NET 9
- Entity Framework Core
- Postgres
- FluentValidation
- Identity
- Autenticação e autorização JWT
- ApiVersioning
- Swagger e OpenApi para documentação da API
- HostedServices

## Configuração e Instalação

### 1. Clonar o repositório

### 2. Configurar a String de Conexão
Edite o arquivo `appsettings.json` e configure a string de conexão para o banco de dados:
```json
 "ConnectionStrings": {
  "TechChallengePostgresConnection": "Host=localhost;Port=0;Database=databasename;Username=username;Password=password"
 }
```

### 3. Instalar as dependências
```sh
dotnet restore
```

### 4. Aplicar as migrações do banco de dados
```sh
dotnet ef database update
```

### 5. Executar a aplicação
```sh
dotnet run
```

## Autor
Seu Nome - Group Tech Challenge


