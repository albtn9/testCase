# Automação de Testes - Sistema de Cadastro de Usuários

## Descrição
Este projeto automatiza os testes para o sistema web de cadastro de usuários disponível em:  
https://test-automation-practice.com.br/forms

O objetivo é validar os principais fluxos de cadastro, incluindo cenários de sucesso e erro, com cobertura automatizada utilizando Cypress.

---

## Estrutura do Projeto

- `cypress/e2e/cadastro/cadastroSucesso.cy.js` — testes de cadastro bem-sucedido  
- `cypress/e2e/cadastro/cadastroErro.cy.js` — testes de cenários de erro  
- `cypress/support/commands.js` — comandos customizados para facilitar a automação  
- `cypress/reports/geral/index.html` — relatório gerado após execução dos testes  
- `package.json` — dependências e scripts para execução

---

## Requisitos

- Node.js instalado (versão recomendada: 16+)
- Internet para acessar o site de testes

---

## Instalação

Execute o comando abaixo para instalar todas as dependências necessárias para rodar os testes

```bash
npm install
```

## Execução de Todos os Testes

Este comando executa todos os testes automatizados (sucesso e erro) e gera um relatório consolidado

```bash
npm run report:todos
```

## Executar apenas testes de sucesso

```bash
npm run test:sucesso
```

## Executar apenas testes de erro

```bash
npm run test:erro
```

## Relatório

Após a execução, o relatório detalhado será gerado neste caminho

```bash
cypress/reports/geral/index.html
```

## **⚠️ Observações Importantes**

- ✅ Os testes cobrem validação dos campos obrigatórios, formatação de e-mail, consistência de senha e de pagamento.
- 📩 As mensagens exibidas pelo sistema são validadas conforme o esperado.
- 🧪 O projeto utiliza a ferramenta **Cypress** versão **13.5.0**.
