const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const { getMaxListeners } = require('process');

const PORT = process.env.PORT || 8080;
const app = express();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use(express.static(path.join(__dirname , 'public')));
app.use(cookieParser('top-secret-51'))
app.use(session({
    secret: 'top-secret-51',
    resave: false,
    saveUninitialized: false
}));

const userEmail = "walter@gmail.com";
const userPassword = 12345

//Temple Engines
app.set('views', './views');
app.set('view engine', 'ejs');


//Routes
app.get('/' , (req, res ) =>{
    res.render('index');
});

app.post('/register' , (req , res) =>{
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    req.session.email = userEmail;
    req.session = userPassword;
    req.session.isAdmin = userEmail.split('@') [1].includes('admin');
    res.redirect('/profile');
})

app.post('/profile' , (req, res) =>{
    res.render('profile', {});
})

app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    res.cookie('userEmail', email);
    res.cookie('userPassword', password);
    res.send(`
    <h1>Bienvenido ${email}</h1>
    <div class="button" color="blue"><a href="index.html">Login</a></div>
    `)
});

//PUERTO 8080
app.listen(PORT , () => {
    console.log('Server is up and running in port =>' , PORT);
});