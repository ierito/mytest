const Field = require('../models').Field;

const getOne = async function(id, res) {
    [err, field] = await to(Field.findOne({ where: { id : id } }));
    if(err || !field) return ReE(res, "err finding Field");
    return field;
}

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, field;

    let field_info = req.body;

    [err, field] = await to(Field.create(field_info));
    if(err) return ReE(res, err, 422);

    [err, field] = await to(field.save());
    if(err) return ReE(res, err, 422);

    let field_json = field.toWeb();

    return ReS(res,{field:field_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, fields;

    [err, fields] = await to(Field.findAll());

    let fields_json =[]
    for( let i in fields){
        let field = fields[i];
        let field_info = field.toWeb();
        fields_json.push(field_info);
    }

    console.log('c t', fields_json);
    return ReS(res, {fields:fields_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let field, id;

    id = req.params.id;

    field = await getOne(id, res);

    return ReS(res, {field:field.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, field, data, id;

    id = req.params.id;
    data = req.body;

    field = await getOne(id, res);

    field.set(data);

    [err, field] = await to(field.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {field:field.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let field, err, id;

    id = req.params.id;

    field = await getOne(id, res);

    [err, field] = await to(field.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Field');

    return ReS(res, {message:'Deleted Field'}, 204);
}
module.exports.remove = remove;
