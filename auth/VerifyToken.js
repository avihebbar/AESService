var jwt = require('jsonwebtoken');
var config = require('../config');

var excludedPaths = ['/auth/login', '/users/register', '/fileUpload']
function verifyToken(req, res, next) {
  if(  excludedPaths.includes(req.path)) return next()
  if( req.path.includes("/fileUpload") ) return next()
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ error: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err);
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    }
    
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;