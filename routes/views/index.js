var keystone = require("keystone");

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = "home";

	view.query("contenies", keystone.list("Contents").model.find());

	// Render the view
	view.render("index");
};

/*
var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'content';
  locals.filters = {
		content: req.params.content
	};
	locals.data = {
		contents: []
	};

  // Load Contents
  view.on('init', function(next){
    var q = keystone.list('Contents').model.findOne({
      slug: locals.filters.contents
    });
  
    q.exec(function(err, result){
      locals.data.content = result;
      next(err);
    });
  });
  
  // view.query('contenies', keystone.list('Contents').model.find());



  // Render View
  view.render('contents');
}

*/
