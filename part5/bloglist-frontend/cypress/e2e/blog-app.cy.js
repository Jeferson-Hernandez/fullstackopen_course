describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'pedrito',
      name: 'Pedro jose',
      password: 'pedrito123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const anotherUser = {
      username: 'cristian',
      name: 'cristian jose',
      password: 'cristian123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.login({ username: user.username, password: user.password })
    cy.create({ title: 'Learn Nextjs', author: 'pedrito', url: 'http://pedrito.com', likes: 12 })
    cy.create({ title: 'Learn Javascript', author: 'pedrito', url: 'http://pedrito.com', likes: 99 })
    cy.login({ username: anotherUser.username, password: anotherUser.password })
    cy.create({ title: 'Learn Linux', author: 'cristian', url: 'http://cristian.com', likes: 33 })
    cy.login({ username: user.username, password: user.password })
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pedrito')
      cy.get('#password').type('pedrito123')
      cy.get('#login').click()

      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('pedrito')
      cy.get('#password').type('pedrito12345')
      cy.get('#login').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('pedrito')
      cy.get('#password').type('pedrito123')
      cy.get('#login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('New blog from Cypress')
      cy.get('#author').type('pedrito')
      cy.get('#url').type('http://pedrito/blogs.com')
      cy.get('#create').click()

      cy.contains('New blog from Cypress')
    })

    it('Blog can get like', () => {
      cy.contains('Learn Javascript').contains('view').click()
      cy.contains('Learn Javascript').parent().as('containerShow')

      cy.get('@containerShow').contains('like').click()
      cy.get('@containerShow').contains('likes 1')
    })

    it('User can delete his own blog', () => {
      const token = localStorage.getItem('loggedBlogappUser')
      const { username } = JSON.parse(token)

      cy.contains('Learn Javascript').contains('view').click()
      cy.contains('Learn Javascript').parent().as('containerShow')
      cy.get('@containerShow').contains(username)
      cy.contains('delete').click()
      cy.get('html').contains('Learn Javascript').should('not.exist')
    })

    it('User cant delete others blogs', () => {
      const token = localStorage.getItem('loggedBlogappUser')
      const { username } = JSON.parse(token)

      cy.contains('Learn Linux').contains('view').click()
      cy.contains('Learn Linux').parent().as('containerShow')
      cy.get('@containerShow').contains(username).should('not.exist')
      cy.contains('delete').should('not.exist')
    })

    it('Ordering likes desc', () => {
      cy.get('.blog').eq(0).should('contain', 'Learn Javascript')
      cy.get('.blog').eq(1).should('contain', 'Learn Linux')
      cy.get('.blog').eq(2).should('contain', 'Learn Nextjs')
    })
  })
})