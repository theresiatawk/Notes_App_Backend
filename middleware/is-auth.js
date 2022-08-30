const jwt = require('jsonwebtoken');

//Verfying the access token
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader){
        const error = new Error('Unauthorized');
        error.statusCode = 401; 
        throw error;
    }
    // Splitting the token
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try{
        console.log("HEYYYYYYY");
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
        console.log("Decoded Token: ", decodedToken);
    }
    catch(error) {
        error.statusCode = 500;
        throw(error);
    }
    if(!decodedToken){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};