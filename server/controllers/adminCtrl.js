module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db');

        db.get_all_users()
            .then(dbRes => res.status(200).send(dbRes))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    editUser: (req, res) => {
        const db = req.app.get('db');

        const userId = +req.params.userId;
        const { first_name, last_name, email } = req.body;

        db.editUser(userId, first_name, last_name, email)
            .then(() => res.sendStatus(200))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }  
}