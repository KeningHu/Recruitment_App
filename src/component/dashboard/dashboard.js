import  React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

function Msg(){
	return <h2>Msg page</h2>
}

@connect(
	state=>state,
	{getMsgList, recvMsg}
)
class Dashboard extends React.Component{
	componentDidMount(){
		this.props.getMsgList()
		this.props.recvMsg()
	}
	
	render(){
		const user = this.props.user
		const {pathname} = this.props.location
		const navList = [
		{
			path: '/boss',
			text: 'genius',
			icon: 'boss',
			title: 'list of genius',
			component: Boss,
			hide: user.type=='genius'
		},
		{
			path: '/genius',
			text: 'boss',
			icon: 'job',
			title: 'list of boss',
			component: Genius,
			hide: user.type=='boss'
		},
		{
			path: '/msg',
			text: 'message',
			icon: 'msg',
			title: 'list of message',
			component: Msg
		},
		{
			path: '/me',
			text: 'me',
			icon: 'user',
			title: 'User center',
			component: User
		},


	]
		return (
			<div>
				<NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
				
			</div>
			
		)
	}

}

export default Dashboard