var keystone = require('keystone');
var Types = keystone.Field.Types;

var Contents = new keystone.List('Contents', {
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true },
});

Contents.add({
	title: { type: String, required: true },
	brief: { type: Types.Html, wysiwyg: true, height: 150 },
});

Contents.register();

/* 
Right_Photo :{
		image: { type: Types.CloudinaryImages },
		name: { type: String, required: true },
		job: { type: String, required: true },
	},


*/