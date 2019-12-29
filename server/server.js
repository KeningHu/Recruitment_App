/*
* @Author: hukening
* @Date:   2019-12-28 13:53:58
* @Last Modified by:   hukening
* @Last Modified time: 2019-12-28 14:37:13
*/
const express = require('express') 
const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
	console.log('success')
} )

const User = mongoose.model('user', new mongoose.Schema({
	user: {type: String, requeir: true},
	age: {type: Number, require: true}
}))

User.create({
	name: 'imooc',
	age: 19
}, function(err, doc){
	if(!err) {
		console.log(doc)
	} else {
		console.log(err)
	}
})

// create app
const app = express()

app.get('/', function(req, res){
	res.send('<h1>hello</h1>')

})

app.get('/data', function(req, res){
	res.json({name: 'imooc11', type: 'IT'})
})
app.listen(9093, function(){
	console.log('Node app start')
})