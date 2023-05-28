describe('Viewing Live Telemetry', () => {
  before(() => cy.task('seed:db'))

  describe('Motor Controller', () => {
    beforeEach(() => cy.visit('/'))
    it('should show motor controller tab', () => {
      cy.get('.nav-link.active').contains('Motor Controller')
    })

    it('should show rx0', () => {
      cy.get('#rx0')
        .should('contain', 'Battery Voltage')
        .should('contain', '0 V')
    })

    it('should show rx1', () => {
      cy.get('#rx1')
        .should('contain', 'Accelerator Position')
        .should('contain', '0')
    })
  })

  describe('BMS', () => {
    beforeEach(() => cy.visit('/bms'))
    it('should show motor controller tab', () => {
      cy.get('.nav-link.active').contains('BMS')
    })

    it('should show rx0', () => {
      cy.get('#rx0')
        .should('contain', 'Average Cell Voltage')
        .should('contain', '0 V')
    })
  })
})
