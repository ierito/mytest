const Player = require('../models').Player;

const getOne = async function(id, res) {
    [err, player] = await to(Player.findOne({ where: { id : id } }));
    if(err || !player) return ReE(res, "err finding Player");
    return player;
}

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, player;

    let player_info = req.body;

    [err, player] = await to(Player.create(player_info));
    if(err) return ReE(res, err, 422);

    [err, player] = await to(player.save());
    if(err) return ReE(res, err, 422);

    let player_json = player.toWeb();

    return ReS(res,{player:player_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, players;

    [err, players] = await to(Player.findAll());

    let players_json =[]
    for( let i in players){
        let player = players[i];
        let player_info = player.toWeb();
        players_json.push(player_info);
    }

    console.log('c t', players_json);
    return ReS(res, {players:players_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let player, id;

    id = req.params.id;

    player = await getOne(id, res);

    return ReS(res, {player:player.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, player, data, id;

    id = req.params.id;
    data = req.body;

    player = await getOne(id, res);

    player.set(data);

    [err, player] = await to(player.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {player:player.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let player, err, id;

    id = req.params.id;

    player = await getOne(id, res);

    [err, player] = await to(player.destroy());
    if(err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, {message:'Deleted Company'}, 204);
}
module.exports.remove = remove;
