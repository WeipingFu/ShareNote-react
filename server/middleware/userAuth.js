/**
 * Created by fuweiping on 2017/6/23.
 */
var jwt = require('jwt-simple');
var settings = require('../settings');

module.exports = function(req, res, next) {
    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'],
          name = req.params.username;
    let username;
    if (token) {
        try {
            console.log('serverToken: ' + token);
            var decoded = jwt.decode(token, settings.tokenSecret);
            console.log(decoded.username);
            if (decoded.exp < Date.now()) {
                return res.status(500).end({"error": 'TOKEN_EXP'});
            }
            username = decoded.username;
            if(name) {
                if(username !== name) {
                    return res.status(500).end({"error": 'TOKEN_ERR'});
                }
            }
        } catch (err) {
            res.status(500);
            return res.send({"error": 'TOKEN_ERR'});
        }
    } else {
        return res.status(404).end({"error": 'TOKEN_NOT_EXIST'});
    }
    req.username = username;
    next();
};