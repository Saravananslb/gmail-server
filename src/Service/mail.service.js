const mailModel = require('../Models/mail.model');

const createMail = async(body, userEmail) => {
    const create = new mailModel({
        ...body, from: userEmail
    });
    const mail = await create.save();
    return mail._doc;
}

const getMails = async(userEmail, type) => {
    switch (type){
        case 'inbox':
            return await getInbox(userEmail);
        case 'starred':
            return await getStarred(userEmail);
        case 'sent':
            return await getSent(userEmail);
        case 'draft':
            return await getDraft(userEmail);
        case 'trash':
            return await getTrash(userEmail);
        default:
            return [];
    }
}

const updateMail = async(userEmail, body) => {
    let updated = [];
    const mail = await mailModel.findById(body.id);
    // console.log(mail)
    const newMail = {...mail._doc};
    // console.log(newMail)
    if ((body.isSent === true || body.isSent === false) && newMail.from == userEmail) {
        newMail.isSent = body.isSent;
    }
    if (body.starred === true || body.starred === false) {
        if (body.starred) {
            newMail.starred = [...newMail.starred, userEmail];
        }
        else {
            const removeStar = newMail.filter(item => (item !== userEmail))
            newMail.starred = removeStar;
        }
    }
    if ((body.trash === true || body.trash === false)) {
        if (body.trash) {
            newMail.trash = [...newMail.trash, userEmail];
        }
        else {
            const removeTrash = newMail.filter(item => (item !== userEmail))
            newMail.trash = removeTrash;
        }
    }
    if ((body.delete === true)) {
        newMail.delete = [...newMail.delete, userEmail];
    }
    if (body.read) {
        newMail.readRecepient = [...newMail.readRecepient, userEmail];
    }
    if (!newMail.isSent && newMail.from === userEmail) {
        if (body.emailTo)
            newMail.emailTo = body.emailTo;
        if (body.emailCC)
            newMail.emailCC = body.emailCC;
        if (body.emailBCC)
            newMail.emailBCC = body.emailBCC;
        if (body.body)
            newMail.body = body.body;
        if (body.subject)
            newMail.subject = body.subject;
    }
    console.log(newMail)
    updated = await mailModel.findByIdAndUpdate(body.id, {...newMail});
    console.log(updated)
    return updated;
}

const forwardEmail = async(id, body) => {
    const mail = await mailModel.findById(id);
    if (mail)
    {
        const newMail = new mailModel({
            ...mail, ...body 
        });
        const forward = await newMail.save();
        const forwardedUser = [...mail.forward, forward._id];
        await mailModel.findByIdAndUpdate(id, {...body, forward: forwardedUser, isForward: true});
        return forward._doc;
    }
    
}

const replyEmail = async(id, body) => {
    const mail = await mailModel.findById(id);
    if (mail)
    {
        const newMail = new mailModel({
            ...mail, ...body
        });
        const reply = await newMail.save();
        const replyUser = [...mail.reply, reply._id];
        await mailModel.findByIdAndUpdate(id, {reply: replyUser, isReply: true});
        return reply._doc;
    }
    
}

const getInbox = async(userEmail) => {
    const mailsTo = await mailModel.find({emailTo: { $in: userEmail }});
    const mailsCC = await mailModel.find({emailCC: { $in: userEmail }});
    const mailsBCC = await mailModel.find({emailBCC: { $in: userEmail }});
    return [...mailsTo, ...mailsCC, ...mailsBCC];
}

const getStarred= async(userEmail) => {
    const mails = await mailModel.find({starred: { $in: userEmail }});
    return mails;
}

const getSent = async(userEmail) => {
    const mails = await mailModel.find({isSent: true, from: userEmail });
    return mails;
}

const getDraft = async(userEmail) => {
    const mails = await mailModel.find({isSent: false, from: userEmail });
    return mails;
}

const getTrash = async(userEmail) => {
    const mails = await mailModel.find({trash: { $in: userEmail }});
    return mails;
}

module.exports = {
    createMail,
    getMails,
    updateMail,
    forwardEmail,
    replyEmail
}