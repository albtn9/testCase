describe('Cadastro - Cenários de Erro', () => {
  beforeEach(()=>{
    cy.acessarPaginaDeFormulario();
  });
  it('Exibe erro ao submeter um e-mail mal formatado', () => {
    cy.preencherDadosPessoais({
      firstName: 'João',
      lastName: 'Souza',
      email: 'email-invalido',
      phone: '(11) 99999-9999',
      cpf: '12345678900',
      birthday: '1990-01-01',
      gender: 'Masculino'
    });
    cy.preencherEndereco({
      address: 'Rua A, 123',
      city: 'São Paulo',
      state: 'São Paulo',
      zipCode: '01234-567'
    });
    cy.preencherSenha({
      password: 'Senha123',
      confirmPassword: 'Senha123'
    });
    
    cy.get('[data-testid="input-wantsPayment"]').should('not.be.checked');   
    
    cy.validarEmailInvalido();
    cy.contains('Email inválido').should('be.visible')
    
  });
  
  it('Exibe erro quando senha e confirmação de senha não coincidem', () => {

    cy.preencherDadosPessoais({
      firstName: 'Ana',
      lastName: 'Pereira',
      email: 'ana@email.com',
      phone: '(31) 98765-4321',
      cpf: '98765432100',
      birthday: '1980-12-12',
      gender: 'Feminino'
    });
    cy.preencherEndereco({ 
      address: 'Av. Brasil, 456',
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
      zipCode: '30100-000'
    });
    cy.preencherSenha({
      password: 'Senha123',
      confirmPassword: 'SenhaDiferente456'
    });

    cy.get('[data-testid="input-wantsPayment"]').should('not.be.checked');

    cy.resultadoDoFormulario('Cadastro Incompleto !');
    
    cy.contains('Senhas não coincidem').should('be.visible')
  });

  it('Exibe erro ao submeter com campos obrigatórios em branco', () => {
  
    cy.get('[data-testid="btn-submit"]').click();
    cy.get('[data-testid="input-wantsPayment"]').should('not.be.checked');
    cy.resultadoDoFormulario('Cadastro Incompleto !');
    cy.contains('Deve ter pelo menos 2 caracteres').should('be.visible');
    cy.contains('Email inválido').should('be.visible');    
    cy.contains('Formato: (11) 9999-9999').should('be.visible');
    cy.contains('Selecione um gênero').should('be.visible');
  
  });

  it('Exibe erro ao não preencher dados de cartão', () => {
    cy.preencherDadosPessoais({
      firstName: 'Carlos',
      lastName: 'Oliveira',
      email: 'carlos@email.com',
      phone: '(41) 90000-0000',
      cpf: '11122233344',
      birthday: '1970-07-07',
      gender: 'Masculino'
    });
    cy.preencherEndereco({
      address: 'Rua X, 789',
      city: 'Curitiba',
      state: 'Paraná',
      zipCode: '80000-000'
    });
    cy.preencherInformacoesPagamento({
      cardNumber: ' ',
      expiryDate: ' ',
      cvv: ' '},true);

    cy.preencherSenha({
      password: '$enhaForte123',
      confirmPassword: '$enhaForte123'
    });

    cy.resultadoDoFormulario('Cadastro Incompleto !');
  });
    it('Exibe erro quando nome contem menos que dois caracteres', () => {

    cy.preencherDadosPessoais({
      firstName: 'A',
      lastName: 'P',
      email: 'ana@email.com',
      phone: '(31) 98765-4321',
      cpf: '98765432100',
      birthday: '1980-12-12',
      gender: 'Feminino'
    });
    cy.preencherEndereco({ 
      address: 'Av. Brasil, 456',
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
      zipCode: '30100-000'
    });
    cy.preencherSenha({
      password: 'Senha123',
      confirmPassword: 'Senha123'
    });

    cy.get('[data-testid="input-wantsPayment"]').should('not.be.checked');

    cy.resultadoDoFormulario('Cadastro Incompleto !');
    cy.contains('Deve ter pelo menos 2 caracteres').should('be.visible')
  });
});