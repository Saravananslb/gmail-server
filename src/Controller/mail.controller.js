const { createMail, getMails, updateMail, forwardEmail, replyEmail } = require('../Service/mail.service');

const insertMail = async(req, res) => {
    try{
        const userEmail = res.locals.userEmail;
        const body = req.body;
        const mail = await createMail(body, userEmail);
        res.send(mail);
    }
    catch (error) {
        res.send(error);
    }
};

const getMail = async(req, res) => {
    try{
        const userEmail = res.locals.userEmail;
        const type = req.query.type;
        const mail = await getMails(userEmail, type);
        res.send(mail);
    }
    catch (error) {
        res.send(error);
    }
};

const updateEmail = async(req, res) => {
    try{
        const userEmail = res.locals.userEmail;
        const body = req.body;
        const mail = await updateMail(userEmail, body);
        res.send(mail);
    }
    catch (error) {
        res.send(error);
    }
};

const forwardMail = async(req, res) => {
    try{
        const userEmail = res.locals.userEmail;
        const body = req.body;
        const id = req.query.id;
        const mail = await forwardEmail(id, body);
        res.send(mail);
    }
    catch (error) {
        res.send(error);
    }
};

const replyMail = async(req, res) => {
    try{
        const userEmail = res.locals.userEmail;
        const body = req.body;
        const id = req.query.id;
        const mail = await replyEmail(id, body);
        res.send(mail);
    }
    catch (error) {
        res.send(error);
    }
};

module.exports = {
    insertMail,
    getMail,
    updateEmail,
    forwardMail,
    replyMail
}