const express 			= require('express');
const router 			= express.Router();

// const UserController 	= require('./../controllers/UserController');
// const CompanyController = require('./../controllers/CompanyController');
// const HomeController 	= require('./../controllers/HomeController');

const PlayerController  = require('./../controllers/PlayerController');
const OliController  = require('./../controllers/OliController');
const FieldController  = require('./../controllers/FieldController');
const SessionController  = require('./../controllers/SessionController');

// const custom 	        = require('./../middleware/custom');

// const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

// Players
router.post( '/players', PlayerController.create);
router.get( '/players', PlayerController.getAll);
router.get( '/players/:id', PlayerController.get);
router.put( '/players/:id', PlayerController.update);
router.delete( '/players/:id', PlayerController.remove);

// Olis
router.post( '/olis', OliController.create);
router.get( '/olis', OliController.getAll);
router.get( '/olis/:id', OliController.get);
router.put( '/olis/:id', OliController.update);
router.delete( '/olis/:id', OliController.remove);

// Fields
router.post( '/fields', FieldController.create);
router.get( '/fields', FieldController.getAll);
router.get( '/fields/:id', FieldController.get);
router.put( '/fields/:id', FieldController.update);
router.delete( '/fields/:id', FieldController.remove);

// Sessions
router.post( '/sessions', SessionController.create);
router.get( '/sessions', SessionController.getAll);
router.get( '/sessions/:id', SessionController.get);
router.put( '/sessions/:id', SessionController.update);
router.delete( '/sessions/:id', SessionController.remove);

// router.post(    '/users',           UserController.create);                                                    // C
// router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
// router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
// router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
// router.post(    '/users/login',     UserController.login);

// router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
// router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

// router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
// router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
// router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

// router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
