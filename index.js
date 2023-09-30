const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 4500;

app.use(bodyParser.json())

// --- Listen to port --- 
app.listen(port, () => {
    console.log('Server running at http://localhost:'+port);
});

app.get('/', (req, res) => {
    res.json("sid")
    res.end
})

// get config vars
dotenv.config();

// generate JWT Token function
function generateJWTToken(username){
    return jwt.sign({name: username}, process.env.TOKEN_SECRET, { expiresIn: 1800});
}
app.post('/createNewUser', function(req, res) {
    const userToken = generateJWTToken(req.body.username); 
    console.log(userToken);
    res.json(userToken);
    res.end
});

// // authenticate user
app.get('/validateUser', function(req, res){
    console.log(req.headers['authorization'])    
    const tokenToBeVerified = req.headers['authorization']
    
    if(tokenToBeVerified == null) res.sendStatus(401)

    jwt.verify(tokenToBeVerified, process.env.TOKEN_SECRET, (error, user) =>{
        if (error) return res.sendStatus(403)
        console.log(user)
        res.json(user)
    })
});

