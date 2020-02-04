import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg,recvMsg} from '../../redux/chat.redux'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
@connect(
	state=>state,
	{getMsgList, sendMsg,recvMsg}

)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {text:'',msg:[]}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}

	handleSubmit(){
		// socket.emit('send msg',{text:this.state.text})
		// this.setState({text:''})
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text

		this.props.sendMsg({from, to, msg})
		this.setState({
			text:'',
			showEmoji:false
	})

		// console.log(this.state)
	}
	render(){
		// console.log(this.props)
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))

		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userid]){
			return null
		}
		return (
			<div id='chat-page'>
			<NavBar 
				icon={<Icon type="left" />}
				model='dark'
				onLeftClick={()=>{
					this.props.history.goBack()
				}}
				>
				{users[userid].name}
			</NavBar>

			{this.props.chat.chatmsg.map(v=>{
				// const avatar = require(`../img/${users[v.from].avatar}.png`)
				const avatar = require(`../img/${users[v.from].avatar}.png`)
				return v.from==userid?(
						<List key={v._id}>
							<Item
								thumb={avatar}
							>{v.content}</Item>
						</List>
					
					):(
						<List key={v._id}>
							<Item
								extra={<img src={avatar} />}
							 	className='chat-me'
							 	>{v.content}</Item>
						</List>
					// <p key={v._id}>sent by me:{v.content}</p>

					)
			})}
				<div className="stick-footer">
				<List>
					<InputItem
						placeholder='Text message'
						value={this.state.text}
						onChange={v=>{
							this.setState({text:v})
						}}
						extra={
							<div>
								<span
								style={{marginRight:15}}
								onClick={()=>{
									this.setState({
										showEmoji:!this.state.showEmoji
									})
									this.fixCarousel()
								}}
								>😁</span>
								<span onClick={()=>this.handleSubmit()}>send</span>
							</div>
						}
			
					>
					</InputItem>
				</List>
					{this.state.showEmoji?
						<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
						}}
					/>
						:null}
				</div>
			</div>
		)
	}
}
export default Chat