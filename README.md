# She'sTech Conference App

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0c0891f-f750-4a03-b00e-9a4dd24aaf4b/deploy-status)](https://app.netlify.com/sites/shestech/deploys)

Este projeto tem como objetivo criar uma aplicação web para visualização e controle dos eventos da She'sTech Conference 2019.

![Celular mostrando duas telas da aplicação](../assets/app-sample.png?raw=true)

**DEMO**: [https://shestech.netlify.com](https://shestech.netlify.com)


## Sobre o projeto

Esta aplicação consiste de um SPA desenvolvido utilizando Vue + Firebase Firestore.

Você pode conferir [**neste post**](https://italolelis.com/posts/shestech-app-pt/), de forma detalhada, o processo de desenvolvimento da aplicação.

| O que foi utilizado                                                       | Descrição                                                       |
|---------------------------------------------------------------------------|-----------------------------------------------------------------|
| [Vue.js](https://vuejs.org/)                                              | Framework para desenvolvimento de SPA (Single-Page Application) |
| [Vuex](https://vuex.vuejs.org/)                                           | Gerenciador de estados recomendado para o Vue                   |
| [Firebase Firestore](https://firebase.google.com/docs/firestore?hl=pt-br) | Banco de Dados NoSQL (Serverless)                               |
| [Netlify](https://www.netlify.com/)                                       | Hospedagem e deploy automático                                  |
| [Buefy](https://buefy.org/)                                               | Biblioteca de componentes do Bulma                              |
| [date-fns](https://date-fns.org/)                                         | Biblioteca para gerenciamento de datas (no lugar do Moment.js)  |


## Como executar

Para rodar a aplicação, você irá precisar da versão mais recente do [Node.js](https://nodejs.org/) na sua máquina.

```
# Instalar dependências
npm install

# Executar servidor local com hot-reload
npm run serve

# Compilar arquivos para produção
npm run build
```
