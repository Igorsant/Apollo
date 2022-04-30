# Apollo API

Nesta pasta ficam os arquivos referentes ao backend da aplicação Apollo, mais especificamente a API REST e o Banco de dados.

## Setando variaveis de ambiente

Renomeie os arquivos .env-example e .db.env-example para .env e .db.env respectivamente e adicione as informações necessárias

## Iniciar banco de dados

1. Editar arquivo [.db.env](./.db.env) com as variáveis de ambiente  
    * POSTGRES_USER: Usuário postgres que será usado para conectar ao banco
    * POSTGRES_PASSWORD: Senha do usuário que será usado para conectar ao banco
    * POSTGRES_DB: Nome do banco de dados utilizado para a aplicação

2. Instalar [docker-compose](https://docs.docker.com/compose/install/) (Instalado por padrão com o docker em Mac/Windows)

3. Na pasta raiz (backend/) executar o comando  
    `$ docker-compose up -d`

4. Para parar o banco de dados executar o comando  
    `$ docker-compose down`


## Iniciar a API REST em modo de desenvolvimento

1. [Iniciar banco de dados](#iniciar-banco-de-dados)

2. Instalar as dependências node  
    `$ npm ci`

3. Editar arquivo [.env](./.env) com as variáveis de ambiente
    * NODE_ENV: Ambiente node (development, production, testing, staging etc)
    * DB_HOST: Host do banco de dados (padrão: localhost)
    * DB_PORT: Porta do host onde o banco de dados é servido (padrão: 5432)
    * DB_NAME: Nome do banco de dados da aplicação (Mesmo nome utilizado na variável POSTGRES_DB na criação do banco)
    * DB_USER: Usuário utilizado para conectar na aplicação
    * DB_PASSWORD: Senha do usuário utilizado para conectar na aplicação  

4. Executar o comando  
    `$ npm run dev`

## Migrations

* Criar Migration:  
`$ npm run migrate:make nome_da_migration`

* Subir Migrações:  
`$ npm run migrate:up`

* Voltar Migrações:  
`$ npm run migrate:down`