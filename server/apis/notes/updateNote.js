/**
 * Created by fuweiping on 2017/7/12.
 */

var NoteModel = require('../../models/note');

module.exports = function (req, res) {
    let noteId = req.body.id,
        title = req.body.title,
        content = req.body.content,
        tags = req.body.tags,
        notebook = req.body.notebook,
        category = req.body.category,
        receiveAt = Date.now(),
        isPublishing = req.body.isPublishing,
        username = req.username;

    var NoteEntity = new NoteModel();

    NoteEntity.getOneNote({
        _id: noteId
    }, (err, note) => {
        if(err) {
            return res.status(500).end({"error": 'GENERAL_ERROR'});
        }
        if(!note) {
            return res.status(404).end({"error": 'NOTE_NOT_EXIST'});
        }
        let newNote = {
            title: title,
            content: content,
            tags: tags,
            notebook: notebook,
            category: category,
            receiveAt: receiveAt,
            isPublishing: isPublishing
        };
        if(title !== note.title) {
            NoteEntity.getOneNote({
                title: title,
                username: username
            }, (err, note) => {
                if(err) {
                    return res.status(500).send({"error": 'GENERAL_ERROR'});
                }
                if(note) {
                    return res.status(500).send({"error": 'NOTE_TITLE_EXIST'});
                }
                NoteEntity.updateNote(noteId, newNote, err => {
                    if(err) {
                        return res.status(500).send({"error": 'UPDATE_NOTE_ERROR'});
                    }
                    return res.status(200).send({"success": 'UPDATE_NOTE_SUCCESS'});
                });
            });
        } else {
            NoteEntity.updateNote(noteId, {$set:newNote}, err => {
                if(err) {
                    return res.status(500).send({"error": 'UPDATE_NOTE_ERROR'});
                }
                return res.status(200).send({"success": 'UPDATE_NOTE_SUCCESS'});
            });
        }
    });
};