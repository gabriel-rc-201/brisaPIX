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

- **Intermediário**

  - Requisitos
    - [x] O sistema deve ser capaz de cadastrar chaves PIX para os usuários já cadastrados.
    - [x] Uma chave não poderá ser cadastrada mais de uma vez.
    - [x] Cada usuário poderá ter no máximo 3 chaves.
    - [x] O sistema deve ser capaz de realizar transações PIX utilizando chaves cadastradas de usuários.
    - [x] Cada transação deve ser identificada de forma única por um id.
    - [x] Cada transação deve conter a chave do usuário que envia e do usuário que recebe o PIX, além do valor, claro.
    - [x] O sistema deve listar as transações feitas por um usuário
    - [x] O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.
  - Adicionar testes unitários

- **Avançado**

  - Requisitos
    - O sistema deve ser capaz de enviar um email notificando o envio e recebimento de um pix.
    - O email de chegada deve ter o valor recebido, o nome de quem enviou e a data.
    - O email de envio deve ter o valor enviado, o nome de quem recebeu e a data.
  - Adicionar tratamento de erros de maneira global

- **Bonus**
  - Adicionar um `docker-compose` e um `Dockerfile`.
  - [x] Adicionar o diagrama do banco de dados.
        ![diagrama do banco de dados](./src/database/diagrama%20do%20banco%20de%20dados.png)

## Entidades :pencil2:

- [x] Usuários
  - [x] O usuário deve possuir nome (nome do usuário), telefone (telefone do usuário), email e um id.
- [x] Chaves.
  - [x] A entidade chaves deve possuir um valor (referente a chave a ser salva), id e a relação com o usuário dono da chave.
- [x] Transações.
  - [x] A transação deve possuir um valor (referente ao valor em R$ da transação), relação com quem envia e quem recebe o PIX (usuário que envia e usuário que recebe o PIX) e um id.
