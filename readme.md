## Como rodar

verifique se tem o `docker` e o `docker-compose` instalado  
na raiz do projeto rode o seguinte comando:

```
docker-compose up -d
```

para ver os logs da aplicação use o seguinte comando:

```
docker logs brisapix -f
```

## Sobre o desafio :pushpin:

- O desafio consiste em desenvolver uma API REST para o sistema de transações do BrisaPIX.

- [x] **Básico**
  - [x] Requisitos
  - [x] O sistema deve ser capaz de estabelecar uma conexão com um banco de dados Postgres.
  - [x] O sistema deve ser capaz de lidar com requisições com formato de dados do tipo `JSON`.
  - [x] O sistema deve ser capaz de cadastrar usuários.
  - [x] O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.
- [x] Adicionar arquivo de rotas do Insomnia
- [x] Adicionar migrations

- [x] **Intermediário**

  - [x] Requisitos
    - [x] O sistema deve ser capaz de cadastrar chaves PIX para os usuários já cadastrados.
    - [x] Uma chave não poderá ser cadastrada mais de uma vez.
    - [x] Cada usuário poderá ter no máximo 3 chaves.
    - [x] O sistema deve ser capaz de realizar transações PIX utilizando chaves cadastradas de usuários.
    - [x] Cada transação deve ser identificada de forma única por um id.
    - [x] Cada transação deve conter a chave do usuário que envia e do usuário que recebe o PIX, além do valor, claro.
    - [x] O sistema deve listar as transações feitas por um usuário
    - [x] O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.
  - [x] Adicionar testes unitários
    > na hora de rodar os testes tem q comentar a parte de envio de email em `src/modules/transacao/useCases/CreateTransacaoUseCase.ts` pq o constructor do `sendEmailService` roda uma função assincrona que não da para ser executada durante os testes, visto que não podemos colocar async no constructor de uma classe.

- [x] **Avançado**

  - [x] Requisitos
    - [x] O sistema deve ser capaz de enviar um email notificando o envio e recebimento de um pix.
    - [x] O email de chegada deve ter o valor recebido, o nome de quem enviou e a data.
    - [x] O email de envio deve ter o valor enviado, o nome de quem recebeu e a data.
          **Nota:** o envio de email foi feito para emails fakes, então quando ele for realizado será enviado um link através do `console.log` para ver o email enviado
  - [x] Adicionar tratamento de erros de maneira global

- [x] **Bonus**
  - [x] Adicionar um `docker-compose` e um `Dockerfile`.
  - [x] Adicionar o diagrama do banco de dados.
        ![diagrama do banco de dados](./src/database/diagrama%20do%20banco%20de%20dados.png)

## Entidades :pencil2:

- [x] Usuários
  - [x] O usuário deve possuir nome (nome do usuário), telefone (telefone do usuário), email e um id.
- [x] Chaves.
  - [x] A entidade chaves deve possuir um valor (referente a chave a ser salva), id e a relação com o usuário dono da chave.
- [x] Transações.
  - [x] A transação deve possuir um valor (referente ao valor em R$ da transação), relação com quem envia e quem recebe o PIX (usuário que envia e usuário que recebe o PIX) e um id.
