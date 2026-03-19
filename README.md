# Todo List

Aplicação de gerenciamento de tarefas desenvolvida como parte da trilha JavaScript do [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list), com foco em **arquitetura modular**, **manipulação do DOM**, **uso de bibliotecas externas** e **persistência de dados com LocalStorage**.

## Objetivo do Projeto

O objetivo principal era praticar:
- Organização de código com Module Pattern
- Separação de responsabilidades entre lógica e interface
- Criação, edição e remoção de tarefas
- Gerenciamento de grupos/projetos de tarefas
- Persistência de dados no navegador com LocalStorage
- Manipulação de datas e formatação com date-fns
- Interações avançadas com formulários e dialogs

## O que é?

Uma aplicação de todo list totalmente funcional contendo:
- Criação de grupos para organizar tarefas por contexto
- Cadastro de tarefas com título, descrição, data e prioridade
- Marcação de tarefas como concluídas
- Edição e exclusão de tarefas
- Exclusão de grupos
- Interface dinâmica com atualização em tempo real
- Salvamento automático dos dados no navegador

## Como usar

1. Abra o arquivo `index.html` em seu navegador
2. Crie um grupo clicando no ícone de adicionar na seção "Grupos"
3. Selecione o grupo onde deseja organizar suas tarefas
4. Clique no ícone de adicionar tarefa para abrir o formulário
5. Preencha título, descrição, data e prioridade e clique em "Adicionar"
6. Use os ícones da lista para editar, excluir ou marcar tarefas como concluídas

## Funcionalidades

- **Grupos de Tarefas**: Criação e remoção de grupos/projetos para organizar melhor as atividades
- **CRUD de Tarefas**: Criação, leitura, edição e exclusão completas
- **Prioridades Visuais**: Diferenciação de tarefas por nível de prioridade
- **Status de Conclusão**: Marcação de tarefas concluídas com feedback visual
- **Persistência Local**: Dados salvos no LocalStorage, mantendo informações entre sessões
- **Edição com Dialog**: Janela modal dedicada para editar tarefas existentes
- **Datas de Entrega**: Controle de prazo com campos de data e hora
- **Interface Reativa**: Atualização imediata do DOM após cada ação

## Padrões de Código

- **Module Pattern**: Encapsulamento da camada de interface e da lógica de negócio
- **Classe Task**: Modelagem de tarefas com comportamento próprio
- **Separation of Concerns**: Responsabilidades divididas entre renderização e regras da aplicação
- **Serialização/Reconstrução de Objetos**: Conversão de dados salvos para objetos de domínio ao carregar o app
- **Dependency Injection**: Funções de manipulação de eventos e lógica são injetadas no módulo de interface (DOMManager), promovendo desacoplamento entre UI e regras de negócio
- **Event-driven Callbacks**: Uso de callbacks para responder a eventos do DOM de forma dinâmica

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+) - Module Pattern, Classes, LocalStorage API
- date-fns (formatação e manipulação de datas)

---

Projeto desenvolvido seguindo: [The Odin Project - Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)

📍 **Repositório principal com todos os projetos**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)
