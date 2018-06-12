const Session = require('../models').Session;

const getOne = async function(id, res) {
    [err, session] = await to(Session.findOne({ where: { id : id } }));
    if(err || !session) return ReE(res, "err finding Session");
    return session;
}

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, session;

    let session_info = req.body;

    //
    // TODO: validate player, oli and field id!!!
    //

    [err, session] = await to(Session.create(session_info));
    if(err) return ReE(res, err, 422);

    [err, session] = await to(session.save());
    if(err) return ReE(res, err, 422);

    let session_json = session.toWeb();

    return ReS(res,{session:session_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, sessions;

    [err, sessions] = await to(Session.findAll());

    let sessions_json =[]
    for( let i in sessions){
        let session = sessions[i];
        let session_info = session.toWeb();
        sessions_json.push(session_info);
    }

    console.log('c t', sessions_json);
    return ReS(res, {sessions:sessions_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let session, id;

    id = req.params.id;

    session = await getOne(id, res);

    return ReS(res, {session:session.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, session, data, id;

    id = req.params.id;
    data = req.body;

    session = await getOne(id, res);

    session.set(data);

    [err, session] = await to(session.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {session:session.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let session, err, id;

    id = req.params.id;

    session = await getOne(id, res);

    [err, session] = await to(session.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Session');

    return ReS(res, {message:'Deleted Session'}, 204);
}
module.exports.remove = remove;
