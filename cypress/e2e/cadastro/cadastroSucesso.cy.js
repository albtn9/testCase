describe('Test Automation - Formulário de Cadastro com Sucesso', () => {
  beforeEach(()=>{
    cy.acessarPaginaDeFormulario();
  });
  it('deve cadastrar usuário com dados de pagamento com sucesso', () => {
   
    cy.preencherDadosPessoais({
      firstName: 'Maria',
      lastName: 'Silva',
      email: 'maria@email.com',
      phone: '21 99999-0000',
      cpf: '98765432100',
      birthday: '1990-01-01',
      gender: 'Feminino'
    });
    cy.preencherEndereco({
      address: 'Av. Central, 1000',
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
      zipCode: '20000-000'
    });
    cy.preencherInformacoesPagamento({
      cardNumber: '4111 1111 1111 1111',
      expiryDate: '03/30',
      cvv: '787'
    },true);

    cy.preencherSenha({
      password: 'SenhaoBunitoDimais123',
      confirmPassword: 'SenhaoBunitoDimais123'
    });

    cy.resultadoDoFormulario('Cadastro completo com sucesso');
    
    cy.validarDadosDoFormulario({
      name: 'Maria Silva',
      email : 'maria@email.com',
      phone : '(21) 9999-9000',
      cpf: '987.654.321-00',
      state: 'rj',
      gender: 'female'
    });

    cy.validarEstatisticasDoFormulario({
      envios: 1,
      erros: 0,
      taxaDeSucesso: 100
    });
  });
  it('deve cadastrar usuário sem dados de pagamento com sucesso', () => {
 
    cy.preencherDadosPessoais({
      firstName: 'João',
      lastName: 'Souza',
      email: 'joao@email.com',
      phone: '11 98888-0000',
      cpf: '12345678900',
      birthday: '1992-01-01',
      gender: 'Masculino'
    });
    cy.preencherEndereco({
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'São Paulo',
      zipCode: '01000-000'
    });

    cy.preencherSenha({
      password: 'SenhaSegura123',
      confirmPassword: 'SenhaSegura123'
    });

    cy.resultadoDoFormulario('Cadastro completo com sucesso');

    cy.validarDadosDoFormulario({
      name: 'João Souza',
      email : 'joao@email.com',
      phone : '(11) 9888-8000',
      cpf: '123.456.789-00',
      state: 'sp',
      gender: 'male'
    });
    cy.validarEstatisticasDoFormulario({
      envios: 1,
      erros: 0,
      taxaDeSucesso: 100
    });
  });
});
