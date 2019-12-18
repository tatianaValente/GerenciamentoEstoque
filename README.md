# GereciamentoEstoque

O projeto está contido dentro da pasta "GerenciamentoEstoque". Dentro dela podemos encontrar as pastas "Estoque.API", referente ao projeto do backend, e "WebApp", referente ao projeto do frontend.

## Backend

O backend foi desenvolvido em C# utilizando o framework .NET CORE 3.0 afim de rodar em qualquer ambiente. A estrutura escolhida foi o ASP.NET Core MVC. O framework de persistência utilizado neste projeto é o Entity. O banco de dados foi feito no SQL Server e criado a partir do Migration (https://docs.microsoft.com/pt-br/ef/core/managing-schemas/migrations/?tabs=vs).

**IMPORTANTE**: Para a execução do código e criação do banco de dados é necessária a criação de uma instância de banco em SQL Server e a inclusão de seus dados na “connectionString” do arquivo “GerenciamentoEstoque\Estoque.API\Estoque.API.appsettings.json”. Ao rodar o projeto o banco de dados será criado automaticamente no local indicado da connectionString. 


## Frontend

O frontend foi desenvolvido em Java Script - Angular 8 com a utilização da biblioteca do Angular Material.

**IMPORTANTE**: Para sua execução é necessário dar os comandos "npm install" e em seguida "ng server".





