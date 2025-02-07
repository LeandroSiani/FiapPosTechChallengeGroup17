<h1 align="center">
  HACKTHON
</p>

## Tecnologies Backend

- [Jest](https://jestjs.io/)
- [.NET 9](https://dotnet.microsoft.com/en-us/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/)
- [PostgreSQL](https://www.postgresql.org/)
- [FluentValidation](https://fluentvalidation.net/)
- [ASP.NET Identity](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity)
- [Autenticação e autorização JWT](https://jwt.io/)
- [API Versioning](https://learn.microsoft.com/en-us/aspnet/core/web-api/versioning/)
- [Swagger e OpenAPI](https://swagger.io/specification/)
- [Hosted Services no ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services)

  ## Tecnologies Frontend  

- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix-UI](https://www.radix-ui.com/)


## 💻 Requisitos para o projeto rodar

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

## Backend já implementado, agora vamos de Frontend
- Com o backend implementado, o frontend é bem simples, primeiro vamos sair da pasta do server e acessar a pasta web.
  
```bash
$ cd ..
$ cd web
````

- Dentro das pasta web, vamos instalar as dependencias do frontend
  
```bash
$ npm install
````

- Agora com tudo instalado, basta acessar o terminal e iniciar o projeto

```bash
$ npm run dev
````

- Projeto frontend, vai abrir na [url](http://localhost:3000).


