Cypress.Commands.add('acessarPaginaDeFormulario', () => {
  cy.viewport(1280, 762);
  cy.visit('/forms');
  cy.get('[data-testid="cookie-accept-all"]').click({ force: true });
  cy.contains('h1', 'Formulários').should('be.visible');
});

Cypress.Commands.add('preencherDadosPessoais', ({
  firstName,
  lastName,
  email,
  phone,
  cpf,
  birthday,
  gender
}) => {
  cy.get('[data-testid="input-firstName"]').type(firstName);
  cy.get('[data-testid="input-lastName"]').type(lastName);
  cy.get('[data-testid="input-email"]').type(email);
  cy.get('[data-testid="input-phone"]').type(phone);
  cy.get('[data-testid="input-cpf"]').type(cpf, { log: false });
  cy.get('[data-testid="input-birthday"]').type(birthday);
  
  cy.get('[data-testid="select-gender"]').click();
  cy.contains('[role="option"]', gender).click();
});

Cypress.Commands.add('preencherEndereco', ({
  address,
  city,
  state,
  zipCode
}) => {
  cy.get('[data-testid="input-address"]').type(address);
  cy.get('[data-testid="input-city"]').type(city);
  cy.get('[data-testid="select-state"]').click();
  cy.contains('[role="option"]', state).click();
  cy.get('[data-testid="input-zipCode"]').type(zipCode);
});

Cypress.Commands.add('preencherInformacoesPagamento', ({ cardNumber, expiryDate, cvv }, marcarCheckbox = true) => {
  if (marcarCheckbox) {
    cy.get('[data-testid="input-wantsPayment"]').check();
    cy.get('[data-testid="input-wantsPayment"]').should('be.checked');
  }
  cy.get('[data-testid="input-cardNumber"]').type(cardNumber, { log: false });
  cy.get('[data-testid="input-expiryDate"]').type(expiryDate, { log: false });
  cy.get('[data-testid="input-cvv"]').type(cvv, { log: false });
});

Cypress.Commands.add('preencherSenha', ({
  password,
  confirmPassword
}) => {
 cy.get('[data-testid="input-password"]').type(password, { log: false });
 cy.get('[data-testid="input-confirmPassword"]').type(confirmPassword, { log: false });
});

Cypress.Commands.add('resultadoDoFormulario', ( statusEsperado = 'sucesso') => {
  cy.get('[data-testid="btn-submit"]').click();

  const TIMEOUT = 6000;
  if (statusEsperado === 'Cadastro completo com sucesso') {
    cy.contains('Formulário enviado com sucesso!', { timeout: TIMEOUT }).should('be.visible');
  } else if (statusEsperado === 'Cadastro Incompleto !') {
    cy.contains('Erro na validação', { timeout: TIMEOUT }).should('be.visible');
    cy.contains('Corrija os erros antes de enviar.', { timeout: TIMEOUT }).should('be.visible');
  } else {
    throw new Error(`Status esperado inválido: ${statusEsperado}`);
  }
});

Cypress.Commands.add('limparFormulario', () => {
  cy.get('[data-testid="btn-clear"]').click();
});

Cypress.Commands.add('validarEmailInvalido', () => {
  cy.get('[data-testid="input-email"]').then(($input) => {
    expect($input[0].checkValidity()).to.be.false;
  });
});

Cypress.Commands.add('validarDadosDoFormulario', (dados) => {
  cy.get('[data-testid="stats-value-form-data-name"]').should('contain.text', dados.name);
  cy.get('[data-testid="stats-value-form-data-email"]').should('contain.text', dados.email);
  cy.get('[data-testid="stats-value-form-data-phone"]').should('contain.text', dados.phone);
  cy.get('[data-testid="stats-value-form-data-cpf"]').should('contain.text', dados.cpf);
  cy.get('[data-testid="stats-value-form-data-gender"]').should('contain.text', dados.gender);
  cy.get('[data-testid="stats-value-form-data-state"]').should('contain.text', dados.state);
});

Cypress.Commands.add('validarEstatisticasDoFormulario', (estatisticas) => {
  cy.get('[data-testid="stats-value-submit-count"]')
    .should('have.text', `${estatisticas.envios}`);
  cy.get('[data-testid="stats-value-error-count"]')
    .should('have.text', `${estatisticas.erros}`);
  cy.get('[data-testid="stats-value-completion-rate"]')
    .should('have.text', `${estatisticas.taxaDeSucesso}%`);
});