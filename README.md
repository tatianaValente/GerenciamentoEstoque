# GereciamentoEstoque

O backend foi desenvolvido em C# utilizando o framework .NET CORE 3.0 afim de rodar em qualquer ambiente. A estrutura escolhida foi o ASP.NET Core MVC. O framework de persistência utilizado neste projeto é o Entity.
O banco de dados foi feito no SQL Server e criado a partir do Migration (https://docs.microsoft.com/pt-br/ef/core/managing-schemas/migrations/?tabs=vs). 

IMPORTANTE: Para a execução do código e criação do banco de dados é necessário a criação de uma instância de banco em SQL Server e a inclusão de seus dados na 'connectionString' do aqruivo 'GerenciamentoEstoque\Estoque.API\Estoque.API.appsettings.json'
