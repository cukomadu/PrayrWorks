//Home
import React from 'react'
import Header from './preloginheader'

//<h2>TRACK. PRAYER. BETTER.</h2>
//
const Home = React.createClass({

	render: function(){
		return(
				<div>
					<Header />
					<div className="Home">

						<h2>The Simplest way to organize, share, and track your prayers.</h2>	
						<a className="button button-primary SignUp" href="#signup">Create Free Account</a>

					</div>
					<div>
					</div>
				</div>
			)
	}
})

export default Home

//Home

//Pre Header
import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
	render: function(){
		return (
				<div className="Header">
					
					<NavBar />
				</div>
			)
	}
})

const NavBar = React.createClass({
	render: function(){
		return (
				<div className="NavBar navLinks">
					<h1><a href="#home"><span className="AppName" id="left">Prayr</span><span className="AppName" id="right">Works</span></a></h1>
					<a className="button button-primary" href="#home">Home</a>
					<a className="button button-primary" href="#login">Log In</a>
					<a className="button button-primary" href="#signup">Sign Up</a>
				</div>
			)
	}
})

export default Header

//Compose
import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import { User, PrayrModel } from '../models/models'

const Add = React.createClass({
	render: function(){
		return (
				<div>
					<PostHeader />
					<hr />
					<QuickAdd />
				</div>
			)
	}
})


const QuickAdd = React.createClass({

	getInitialState: function(){
		return {
			category: ''

		}
	},

	_getPryrInfo: function(evt){
		evt.preventDefault()
		
		ACTIONS.savePrayrModel({
			to: this.state.category === "toMe" ? User.getCurrentUser().email  : evt.currentTarget.to.value,
			from: User.getCurrentUser().email,
			title: evt.currentTarget.title.value,
			description: evt.currentTarget.description.value
		})

		evt.currentTarget.reset()
	},

	_toMeButton: function(evt){
		evt.preventDefault()
		this.setState({
			category: 'toMe'
		})
	},

	_fromMeButton: function(evt){
		evt.preventDefault()
		this.setState({
			category: 'fromMepryr'
		})
	},

	render: function(){
		var formClass = 'hide',
			toMeClass = '',
			fromMePryrClass = '',
			classNameForSendTo = '',
			fromMeButtonClass = '',
			toMeButtonClass = ''

		 if(this.state.category === 'toMe'){
		 	classNameForSendTo = 'hide'
		 	formClass = ''
		 	toMeButtonClass = 'isSelected'
		 }
		 if(this.state.category === 'fromMepryr'){
		 	classNameForSendTo = ''
		 	formClass = ''
		 	fromMeButtonClass = 'isSelected'
		 }

		
		return (
				<div className="PrayrEditor PrayrComposer">
					<h3>Add</h3>
					<label><strong className="labelToMe">Who Are You Praying For?</strong></label>
					<button className={`${toMeButtonClass} editor`} onClick={this._toMeButton}>Me</button>
					<button className={`${fromMeButtonClass}editor`} onClick={this._fromMeButton}>Others Users</button>
					
					<form className={formClass} onSubmit={this._getPryrInfo}>
						<hr />
						<label className={`${classNameForSendTo}`}>Recipient Email Address</label>
						<input className={`u-full-width ${classNameForSendTo}`} type="text" name="to" placeholder="Enter email address of the person you are praying for" />
						<label>Prayer Title</label>
						<input className="u-full-width" type="text" name="title" placeholder="Who or What you want to pray for?" />
						<label>Description</label>
						<textarea className="u-full-width" name="description" placeholder="Add details to this prayer..."></textarea>
						<button type="submit">Add to PryrList</button>
					</form>
				</div>
			)
	}
})

export default Add

