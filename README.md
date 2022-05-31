## Descrição

Aplicação de controle de produtos construída com 
[Nest](https://github.com/nestjs/nest) framework


## A aplicação pode ser iniciada de duas maneiras localmente:

### Via  Docker
  - Pré-requisitos:
    - Configurar seu arquivo [.env](./.env), o projeto já conta com um exemplo a ser seguido [.env.example](./.env.example)
    - Ter o [Docker](https://www.docker.com/) e [Docker-compose](https://docs.docker.com/compose/) instalados e configurados em sua máquina

  - Excecutar na raíz do projeto o comando **docker-compose up**
  - A aplicação rodará no caminho padrão [Localhost](http://localhost:5000)

### Via linha de comando na raíz do projeto seguindo os passos abaixo:
```bash
#instalação de dependências
$ npm install ou yarn

#iniciando a aplicação
# development
$ npm run start ou yarn start

# watch mode
$ npm run start:dev ou yarn start:dev

# production mode
$ npm run start:prod ou yarn start:prod
 ```


### Testes unitários

```bash
# unit tests
$ npm run test ou yarn test

# test coverage
$ npm run test:cov ou yarn test --coverage
```
- OBS: assim como por meio do Docker a aplicação também rodará no caminho padrão [Localhost](http://localhost:5000)

### Testes da API

- O projeto conta com um [arquivo](./endpoints-insomnia.json) de import para o [Insomnia](https://insomnia.rest/download) para realização dos testes dos endpoints.

- Também pode ser testado via [Swagger](http://localhost:5000/swagger/), apenas com a aplicação rodando por linha de comando