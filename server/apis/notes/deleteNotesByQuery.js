/**
 * Created by fuweiping on 2017/7/25.
 */

var NoteModel = require('../../models/note');

module.exports = function (req, res) {
    let username = req.username,
        query = req.query,
        combineQuery = Object.assign({}, query, {
            username: username
        });
    console.log('denote users:' + username);
    console.log(query);
    var NoteEntity = new NoteModel();

    NoteEntity.deleteNotesByQuery(combineQuery, err => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        return res.status(200).send({"success": 'DELETE_NOTE_SUCCESS'});
    });
};