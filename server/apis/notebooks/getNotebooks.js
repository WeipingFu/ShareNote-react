/**
 * Created by fuweiping on 2017/7/24.
 */

var NotebookModel = require('../../models/notebook');

module.exports = function (req, res) {
    let user = req.username,
        query = req.query,
        combineQuery = Object.assign({}, query, {
            user: user
        });
    console.log(user);
    var NotebookEntity = new NotebookModel();
    NotebookEntity.getNotebooks(combineQuery, (err, notebooks) => {
        if(err) {
            return res.status(500).send({"error": 'GET_NOTEBOOKS_ERROR'});
        }
        return res.status(200).send(notebooks);
    })

};