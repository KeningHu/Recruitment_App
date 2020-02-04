
const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/i-chat'
mongoose.connect(DB_URL)

const models = {
	user:{
		'user': 	{'type':String, 'require':true},
		'pwd' : 	{'type':String, 'require':true},
		'type': 	{'type': String, 'require':true},
		// profile photo
		'avatar': 	{'type':String},
		// self description / job description
		'desc': 	{'type':String, },
		//job position
		'title': 	{'type': String},
		//for boss:
		'company': 	{'type':String},
		'money': 	{'type': String}


	},
	chat:{
		'chatid':{'type':String,'require':true},
		'from' : {'type':String, 'require':true},
		'to' : {'type': String, 'require':true},
		'read':{'type':Boolean, 'default':false},
		'content':{'type':String, 'require': true, 'default':''},
		'create_time':{'type':Number, 'default':new Date().getTime()}


	}

}
for(let m in models){
		mongoose.model(m, new mongoose.Schema(models[m]))
	}
module.exports = {
	getModel: function(name){
		return mongoose.model(name)
	}
}

