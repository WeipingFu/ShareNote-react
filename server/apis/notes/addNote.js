/**
 * Created by fuweiping on 2017/7/2.
 */

var NoteModel = require('../../models/note');

module.exports = function (req, res, next) {
    let title = req.body.title,
        content = req.body.content,
        tags = req.body.tags,
        notebook = req.body.notebook,
        category = req.body.category,
        isPublishing = req.body.isPublishing,
        username = req.username;

    console.log('server-addnote');
    console.log('title: ' + title);
    console.log('content: ' + content);
    console.log('tags: ' + tags);
    console.log('notebook: ' + notebook);
    console.log('category: ' + category);
    console.log('username: ' + username);

    var noteEntity = new NoteModel();
    noteEntity.getOneNote({
        title: title,
        username: username
    }, (err, note) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR' });
        }
        if(note) {
            return res.status(500).send({"error": 'NOTE_EXIST' });
        }
        let newNote = {
            title: title,
            content: content,
            tags: tags,
            notebook: notebook,
            category: category,
            receiveAt: Date.now(),
            isPublishing: isPublishing,
            username: username,
            commentCount: 0
        };
        noteEntity.saveNote(newNote, err => {
            if(err) {
                return res.status(500).send({"error": 'ADD_NOTE_ERROR' });
            }
            return res.status(200).send({"success": 'ADD_NOTE_SUCCESS'});
        });
    });
};