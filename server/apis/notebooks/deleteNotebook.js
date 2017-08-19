/**
 * Created by fuweiping on 2017/7/25.
 */

var NotebookModel = require('../../models/notebook');

module.exports = function (req, res) {
    let user = req.username,
        bookname = req.params.bookname;
    console.log('users:' + user);
    console.log('bookname:' + bookname);

    var NotebookEntity = new NotebookModel();

    NotebookEntity.getOneNotebook({
        bookname: bookname,
        user: user
    }, (err, notebook) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        if(!notebook) {
            return res.status(404).send({"error": 'NOTEBOOK_NOT_EXIST'});
        }
        NotebookEntity.deleteNotebook({
            bookname: bookname,
            user: user
        }, (err) => {
            if(err) {
                return res.status(500).send({"error": 'DELETE_NOTEBOOK_ERROR'});
            }
            return res.status(200).send({"success": 'DELETE_NOTEBOOK_SUCCESS'});
        });
    });
};