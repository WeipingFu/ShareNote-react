/**
 * Created by fuweiping on 2017/7/15.
 */

var NoteModel = require('../../models/note');

module.exports = function (req, res) {
    let noteTitle = req.body.title,
        username = req.username;

    console.log('server-deleteNote: ' + noteTitle);

    var NoteEntity = new NoteModel();

    NoteEntity.deleteNote({
        title: noteTitle,
        username: username
    }, (err) => {
        if(err) {
            return res.status(500).send({"error": 'DELETE_NOTE_ERROR'});
        }
        return res.status(200).send({"success": 'DELETE_NOTE_SUCCESS'});
    });
};