const utils 	= require('utility')

const express  	= require('express')
const Router 	= express.Router()
const model 	= require('./model')
const User 		= model.getModel('user')
const Chat 		= model.getModel('chat')
const _filter 	= {'pwd':0, '__v':0}
// Chat.remove({},function(e,d){

// })

Router.get('/list', function(req, res){
	// User.remove({}, function(e, d){})
	const {type} = req.query
	User.find({type}, function(err, doc){
		return res.json({code:0,data:doc})
	})
})
Router.get('/getmsglist',function(req, res){
	const user = req.cookies.userid
	User.find({}, function(e, userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},
		// {'$or':[{from:user, to:user}]},
		function(err,doc){
		if(!err) {
			return res.json({code:0, msgs:doc,users:users})
		}
	})
	})

	
})
Router.post('/update',function(req,res){
	const userid = req.cookies.userid
	if (!userid) {
		return json.dumps({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})
Router.post('/login', function(req, res){
	const {user, pwd} = req.body
	User.findOne({user, pwd:md5Pwd(pwd)},_filter, function(err, doc){
		if(!doc){
			return res.json({code:1, msg:'User name or password is wrong!'})
		}
		res.cookie('userid', doc._id)
		return res.json({code:0, data:doc})
	})

})

Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user}, function(err, doc){
		if(doc){
			return res.json({code:1, msg:'This name has been used'})
		}

		const userModel = new User({user, type, pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1, msg:'Back-end may have something wrong'})

			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})

	})
})
Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid

	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})

	})
	// {'$or':[{from:user,to:user}]}

})

function md5Pwd(pwd){
	const salt = 'I_am_good_3957x8yoiausd!~@AES'
	return utils.md5(utils.md5(pwd+salt))

}

module.exports = Router

