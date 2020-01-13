const utils 	= require('utility')

const express  	= require('express')
const Router 	= express.Router()
const model 	= require('./model')
const User 		= model.getModel('user')
const _filter 	= {'pwd':0, '__v':0}

Router.get('/list', function(req, res){
	// User.remove({}, function(e, d){})
	User.find({}, function(err, doc){
		return res.json(doc)
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


		// User.create({user, type, pwd:md5Pwd(pwd)}, function(e, d){
		// 	if(e){
		// 	}
		// 	return res.json({code:0})
		// })
	})
})
Router.get('/info', function(req, res){
	const {userid} = req.cookies
	if(!userid) {
		return res.json({code:0})
	}
	User.findOne({_id:userid}, _filter, function(err, doc){
		if(err){
			return res.json({code:1, msg:'Something went wrong'})
		}
		if(doc){
			return res.json({code:0, data:doc})
		}
	})
	// check cookie
	
})

function md5Pwd(pwd){
	const salt = 'I_am_good_3957x8yoiausd!~@AES'
	return utils.md5(utils.md5(pwd+salt))

}

module.exports = Router

