/**
 * Created by fuweiping on 2017/7/21.
 */

var NoteModel = require('../../models/note');
//var decodeQueryParam = require('../utils/decodeQuery');

module.exports = function (req, res) {
    let query = req.query;
    let newQuery = {};
    //console.log(query);
    for(var attr in query) {
        if(attr === 'category' && query[attr] === 'all') {
            console.log('111');
            continue;
            //delete query[attr];
        } else if(attr === 'reg') {
            newQuery.content = new RegExp(query[attr], 'g');
            //delete query[attr];
        } else {
            newQuery[attr] = query[attr];
        }

    }
    console.log(newQuery);
    var NoteEntity = new NoteModel();
    NoteEntity.getNotes(newQuery, (err, notes) => {
        if(err) {
            return res.status(500).send({"error": 'GET_NOTES_ERROR'});
        }
        let json = {
            notes,
            query
        };
        return res.status(200).json(json);
    });
};
