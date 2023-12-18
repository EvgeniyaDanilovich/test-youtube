const showMoreBtn = '.sc-hBpgZr';
const dramaBtn = '.sc-kgvdhe > :nth-child(2)';

describe('The user visits main page', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('[data-testid=FilmsWrapper]').should('exist');
		cy.get('[data-testid=FilmItem]').should('have.length', 16);
	});

	it('Page loads successfully', () => {
		cy.get('[data-testid=MainPage]').should('exist');
	});

	it('Click the button show more', () => {
		cy.get(showMoreBtn).should('exist');
		cy.get(showMoreBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 32);

		cy.get(showMoreBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 48);
	});

	it('Search film by name', () => {
		const searchInput = '[data-testid=InputSearch]';
		const searchBtn = '[data-testid=SearchBtn]';

		cy.get(searchInput).should('exist');
		cy.get(searchInput).type('аватар');

		cy.get(searchBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 2);
	});

	it('Click the button to switch genre to drama', () => {
		cy.get(dramaBtn).should('exist');
		cy.get(dramaBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 16);
	});

	it('Click the button to switch genre to fantastic and show more', () => {
		const fantasticBtn = '.sc-kgvdhe > :nth-child(4)';

		cy.get(fantasticBtn).should('exist');
		cy.get(fantasticBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 16);

		cy.get(showMoreBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 32);
	});

	it('Click the logo and receive all films', () => {
		cy.get(dramaBtn).should('exist');
		cy.get(dramaBtn).click();
		cy.get('[data-testid=FilmItem]').should('have.length', 16);

		cy.get('[data-testid=LogoWrapper]').should('exist');
		cy.get('[data-testid=LogoWrapper]').click();

		cy.get('[data-testid=FilmsWrapper]').should('exist');
		cy.get('[data-testid=FilmItem]').should('have.length', 16);
	});
});
