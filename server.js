const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database')
const app = express();
// const passport = require('passport');
const session = require('express-session');
// const { patch } = require('./routes');
// const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

const port = 3000;

app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false , 
    saveUninitialized: true,
}))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-key'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// })
const corsOptions = {
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
};

app.use(cors(corsOptions));
app.use("/", require("./routes/index.js"))

// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID, 
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
// },
// function(accessToken, refreshToken, profile, done){
//     //User.findOrCreate({ githubId: profile.id }, function (err, user){
//         return done(null, profile);
//     // })
// }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });

// app.get('/github/callback', passport.authenticate('github', {
//     failureRedirect: '/api-docs', session: false}),
//     (req, res) => {
//     req.session.user = req.user;
//     res.redirect('/');
// });

mongodb.initDb((err) => {
    if (err) {
        console.log('Error initializing database:', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Web Server is listening at port ' + (process.env.PORT || port));
        });
    }
});