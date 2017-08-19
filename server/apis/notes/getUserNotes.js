/**
 * Created by fuweiping on 2017/7/4.
 */

var NoteModel = require('../../models/note');

module.exports = function (req, res, next) {
    let username = req.username,
        query = req.query;
    for(var attr in query) {
        if(attr === 'reg') {
            query.content = new RegExp(query[attr], 'g');
            delete query[attr];
        }
    }
    let combineQuery = Object.assign({}, query, {
            username: username
        });

    console.log('getUserNotes: ' + username);
    console.log(combineQuery);

    var NoteEntity = new NoteModel();
    NoteEntity.getNotes(combineQuery, (err, notes) => {
       if(err) {
           return res.status(500).send({"error": 'GENERAL_ERROR'});
       }
       return res.status(200).send(notes);
    });
};