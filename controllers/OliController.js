const Oli = require('../models').Oli;

const getOne = async function(id, res) {
    [err, oli] = await to(Oli.findOne({ where: { id : id } }));
    if(err || !oli) return ReE(res, "err finding Oli");
    return oli;
}

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, oli;

    let oli_info = req.body;

    [err, oli] = await to(Oli.create(oli_info));
    if(err) return ReE(res, err, 422);

    [err, oli] = await to(oli.save());
    if(err) return ReE(res, err, 422);

    let oli_json = oli.toWeb();

    return ReS(res,{oli:oli_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, olis;

    [err, olis] = await to(Oli.findAll());

    let olis_json =[]
    for( let i in olis){
        let oli = olis[i];
        let oli_info = oli.toWeb();
        olis_json.push(oli_info);
    }

    console.log('c t', olis_json);
    return ReS(res, {olis:olis_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let oli, id;

    id = req.params.id;

    oli = await getOne(id, res);

    return ReS(res, {oli:oli.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, oli, data, id;

    id = req.params.id;
    data = req.body;

    oli = await getOne(id, res);

    oli.set(data);

    [err, oli] = await to(oli.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {oli:oli.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let oli, err, id;

    id = req.params.id;

    oli = await getOne(id, res);

    [err, oli] = await to(oli.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Oli');

    return ReS(res, {message:'Deleted Oli'}, 204);
}
module.exports.remove = remove;
