/**
 * Created by fuweiping on 2017/7/24.
 */

var NotebookModel = require('../../models/notebook');

module.exports = function (req, res) {
    let user = req.username,
        bookname = req.body.bookname,
        info = req.body.info;

    var NotebookEntity = new NotebookModel();
    NotebookEntity.getOneNotebook({
        bookname: bookname,
        user: user
    }, (err, notebook) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        if(notebook) {
            return res.status(500).send({"error": 'NOTEBOOK_EXIST'});
        }
        NotebookEntity.saveNotebook({
            bookname: bookname,
            info: info,
            user: user
        }, err => {
            if(err) {
                return res.status(500).send({"error": 'ADD_NOTEBOOK_ERROR'});
            }
            return res.status(200).send({"success": 'ADD_NOTEBOOK_SUCCESS'});
        });
    });
};