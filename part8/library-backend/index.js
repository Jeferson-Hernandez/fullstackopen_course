const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = `
    type Author {
        name: String!
        bookCount: Int
        born: Int
        id: ID!
    }

    type Book {
        title: String!,
        published: Int!,
        author: Author!,
        genres: [String!]!
        id: ID!        
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        addAuthor(
            name: String!
            born: Int 
        ): Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        authorCount: async () => Author.collection.countDocuments(),
        bookCount: async () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                const book = await Book.find({
                    genres: { $all: [args.genre] }
                })
                console.log(book);
                return book
            }
            return Book.find({})
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: (root) => {
            let booksByAuthor = books.filter(book => book.author === root.name)
            return booksByAuthor.length
        }

    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            if (args.title.length <= 2) {
                throw new GraphQLError('title must be at least 3 characters long.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }

            const author = await Author.findOne({ name: args.author })
            if (!author) {
                throw new GraphQLError('author not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author
                    }
                })
            }

            const book = new Book({ ...args, author: author._id})
            console.log(book);
            return book.save()
        },
        addAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            if (args.name.length <= 4) {
                throw new GraphQLError('name must be at least 4 characters long.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            const author = new Author({ ...args })
            return author.save()
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            let author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new GraphQLError('author not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author
                    }
                })
            }

            const authorUpdate = {
                name: author.name,
                born: args.setBornTo
            }

            const updatedAuthor = await Author.findByIdAndUpdate({ _id: author._id }, authorUpdate, { new: true })
            return updatedAuthor
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'normal') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('bearer')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})