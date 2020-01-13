import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import {connect } from 'react-redux'
import {register} from '../../redux/user.redux'


@connect(
	state=>state.user,
	{register}

)

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user 	 	:'',
			pwd 	 	:'',
			repeatpwd 	:'',
			type 		: 'genius' // boss
		}
		this.handleRegister = this.handleRegister.bind(this)
	}
	
	handleChange(key, val){
		this.setState({
			[key]:val
		})
	}

	handleRegister(){
		this.props.register(this.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<List>
					{this.props.msg? <p className='error-msg'>{this.props.msg}</p>:null}
					<WhiteSpace />
					<InputItem
						onChange={(v)=>this.handleChange('user', v)}

					>User name</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={(v)=>this.handleChange('pwd', v)}
					>Password</InputItem>
					<WhiteSpace />
					<InputItem placeholder='confirm your password' 
						type='password'
						onChange={(v)=>this.handleChange('repeatpwd', v)}

					>Confirm</InputItem>
					<WhiteSpace />
					<RadioItem checked={this.state.type==='genius'}
					onChange={()=>this.handleChange('type','genius')}

					>
						genuis
					</RadioItem>
					<RadioItem checked={this.state.type==='boss'}
					onChange={()=>this.handleChange('type','boss')}


					>
						boss
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}
					> Register</Button>

				</List>
			</div>
		)
	}
}

export default Register;