var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var {Subscriberemailist,ExpressCassandra,models} = require('../Subscriberemailist'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//subscriber
router.get('/addsub', function(req, res, next) {
  res.render('addsub', { add: 'Add New Subscriber' });
});
router.post('/postsubscriber', function(req, res) {	 
		var subid = models.uuid();
		var emailfirst = req.body.emailfirst;

		var emailsecond = req.body.emailsecond;
	
	   var created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	   // var email = (emailfirst==emailsecond);

 // if(email){

	// var dataf = new models.instance.Subscriberemailist({subid, emailfirst,created});		 
	// dataf.save()
	// res.redirect('/sview');	
                             
	//       }

 //    else{
		
	var datas = new models.instance.Subscriberemailist({subid, emailfirst,emailsecond,created});		 
	datas.save();

	res.redirect('/sview');	
                               
         
});



router.get('/sview', function(req, res, next) {

	 models.instance.Subscriberemailist.find({}, function(err,subs) {
		if(err) console.log(err);
		res.render('sview', {
			moment:moment,
			subs: _.orderBy(subs, ["created"], ['asc']),
			view: 'View Subscriber'
		});

	});	
});
router.get('/sedit/:subid',function(req,res,next){
	var id = models.uuidFromString(req.params.subid);
models.instance.Subscriberemailist.findOne({subid:id}, function(err, subss){  
		res.render('sedit',{subs:subss,
			edit:'Edit'});
	});

});

//subscieber end
router.post('/supdate/:s', function(req, res, next) {
	var emailfirst = req.body.emailfirst;
	var emailsecond = req.body.emailsecond;
	var  sid = models.uuidFromString(req.params.s);
	
 	var created = Date();

 	
	 
	models.instance.Subscriberemailist.update({subid:sid},{name,web,created}, function(err){

	});	     
	res.redirect('/sview');
 });

router.get('/sdelete/:dd',(req,res)=>{
	var id = models.uuidFromString(req.params.dd);
	models.instance.Subscriberemailist.findOne({subid:id}, function(err, subss){  


		var eme = subss.emailfirst;
		var em   = eme.indexOf('@');
		var emse = subss.emailsecond;
		var ems = emse.indexOf('@');
		var email = (em==ems);
		if(email){

	    models.instance.Subscriberemailist.delete({subid:id},function(err){
	 	if(err) throw err;
	 	res.redirect('/sview');
		
	 });
		}
		else{
			res.redirect('/sview');

		}
	});






	
})
module.exports = router;
