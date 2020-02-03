
import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form.js'

@connect(
	state=>state.user, 
	{login}

)
@imoocForm

class Login extends React.Component{
	constructor(props){
		super(props);
		
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register(){
		console.log(this.props)
		this.props.history.push('/register')
	}
	handleChange(key, val){
			console.log(key,val)
		this.setState({
			[key]:val
		})
	}

	
	handleLogin(){
		this.props.login(this.props.state)
	}

	render(){
		return (
			<div>
				{(this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />:null}

				<Logo></Logo>
				<WingBlank>
				<List>
					{this.props.msg? <p className='error-msg'>{this.props.msg}</p>:null}
					<InputItem
					onChange={(v)=>this.props.handleChange('user', v)}


					>User Name</InputItem>
					<WhiteSpace />
					<InputItem
					type='password'
					onChange={(v)=>this.props.handleChange('pwd', v)}

					>Password</InputItem>
				</List>
				<WhiteSpace />
					<Button onClick={this.handleLogin}type='primary'>Login</Button>
					<WhiteSpace />
					<Button onClick={this.register}type='primary'>Register</Button>
				</WingBlank>
			</div>

		)
	}
}

export default Login;