/*
* @Author: hukening
* @Date:   2019-12-30 10:34:18
* @Last Modified by:   KeningHu
* @Last Modified time: 2020-02-03 16:34:24
*/
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
	null,
	{loadData}
)

class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList=['/login', '/register']
		const pathname = this.props.location.pathname
		if(publicList.indexOf(pathname) > -1) {
			return null
		}
		axios.get('/user/info').
		then(res=>{
			if(res.status===200){
				if(res.data.code===0){
					// login successfully
					this.props.loadData(res.data.data)

				} else {
					this.props.history.push('/login')
				}
			}
		})
	}
	render(){
		return null
	}

}
export default AuthRoute;