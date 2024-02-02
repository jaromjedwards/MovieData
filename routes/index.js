const router = require('express').Router();

router.use('/', require('./swagger'));
const movies = require('./movies');

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'uSy0d3dIStjFQ5keOrxu7LFaoQE5PsrO',
  issuerBaseURL: 'https://dev-0m1ga76jspjnedov.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/', (req, res) => {
    res.send('Welcome to the Movie Data home page');
})
router.use('/movies', requiresAuth(), movies);

module.exports = router;