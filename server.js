require('dotenv').config()

const cors = require('cors')
const cookieSession = require('cookie-session')
const express = require('express')
const app = express()

const db = require('./models')
const Role = db.role

// const corsOptions = {
//   origin: 'http://localhost:8081'
// }

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: 'adi-book-club-session',
        secret: process.env.COOKIE_SECRET,
        keys: ['key1', 'key2'],
        httpOnly: true
    })
)

db.mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('successfully connected to Mongodb')
        initial()
    })
    .catch(err => {
        console.log('connection error', err)
        process.exit()
    })

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log("added 'user' to roles collection")
            })

            new Role({
                name: 'moderator'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log("added 'moderator' to roles collection")
            })

            new Role({
                name: 'admin'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log("added 'admin' to roles collections")
            })
        }
    })
}

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to adi Book Club.' })
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/book.routes')(app)
require('./routes/bookReview.routes')(app)


// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
