
# Task Manager

Esse repositório contém o projeto Task Manager.




## Autor

- [@edumfelix](https://www.github.com/edumfelix)


## Stack utilizada

**Back-end:** C# .NET Core

## Documentação da API

Essa API foi desenvolvida utilizando Swagger

## Funcionalidades

- Listagem de tarefas, Criar nova tarefa, Editar tarefas existentes e Excluir tarefa existente 

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:edumfelix/task-manager.git
```

Entre no diretório do projeto

```bash
  cd TaskManager
```

Instale as dependências do .NET Core

```bash
  dotnet add package Swashbuckle.AspNetCore.SwaggerUI
```

```bash
  dotnet add package Swashbuckle.AspNetCore.SwaggerGen
```
```bash
  dotnet add package Swashbuckle.AspNetCore.Swagger
```
```bash
  dotnet add package Swashbuckle.AspNetCore
```
```bash
  dotnet add package Microsoft.EntityFrameworkCore.Tools
```
```bash
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```
```bash
  dotnet add package Microsoft.AspNetCore.SpaServices --version 3.1.32
```
```bash
  dotnet add package Microsoft.EntityFrameworkCore
```
```bash
  dotnet add package Microsoft.AspNetCore.SpaProxy
```
```bash
  dotnet add package Microsoft.AspNetCore.spaservices.Extensions --version 6.0.0-rc.2.21480.10
```
```bash
  dotnet add package Microsoft.EntityFrameworkCore.Relational
```

Agora, crie o banco e as migrations

```bash
  dotnet ef migrations add DBCreation
```

```bash
  dotnet ef database update
```

Após isso, instale as dependencias do React. Para isso, entre na pasta
```bash
  cd ClientApp
```

Instale as dependências

```bash
  npm i
```

Inicie o servidor

```bash
  cd ..
```

```bash
  cd dotnet run
```


## FAQ

#### Qual arquitetura foi desenvolvida na execução deste projeto?

Este projeto foi desenvolvido implementando noções em conjunto dos modelos MVC e Clean Archictecure. Por uma questão de praticidade, o projeto não implementa todas as camadas de abstração existentes no padrão Clean Architecture.

#### Quais entidades foram desenvolvidas para solucionar as questões propostas no desafio?

O sistema é composto basicamente por uma entidade (Task).

#### Quais pontos do projeto podem ser melhorados?

- Acredito que o código poderia ser mais limpo no front-end, entretanto React não é uma ferramenta que domino e teria sido melhor desenvolvido com Angular

- A gestão de acesso as rotas também foi feita de maneira a simplificar o desenvolvimento e atender de maneira prática as questões propostas.


## 🚀 Sobre mim
Eu sou um Desenvolvedor de Sistemas que possui conhecimento nas Stacks C# .NET, Angular, Django, DRF, SQL Server e me aventurei em React neste projeto.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)