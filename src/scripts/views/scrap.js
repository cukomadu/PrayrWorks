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


// Prayr composer
import React from 'react'
import ACTIONS from '../actions'
import PreHeader from './preHeader'
import { User, PrayrModel } from '../models/models'
import PRAYR_STORE from '../prayrStore'

//<PreHeader />

const PrayrComposer = React.createClass({


	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){

		
		var toMePrayrQuery = {
			//to: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPrayrsByQuery(toMePrayrQuery)
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')

	},

	render: function(){
		let collectionToPassDown

		if(this.state.currentView === "allpryrstome"){
			collectionToPassDown = this.state.prayrCollection.where({
				answered: false
			})
		}

		return (
				<div className="SignIn">
					<SharePrayr prayrColl={collectionToPassDown}/>
				</div>
			)
	}
})

const SharePrayr  = React.createClass({

	_getshareInfo: function(evt){
		console.log(this.props.prayrColl.get('description'))
		evt.preventDefault()

		var sharePrayrInfo = {
			to: evt.currentTarget.email.value,
			//from: User.getCurrentUser().email,
			description: this.props.prayrColl.get('description') ? evt.currentTarget.description.value : this.props.prayrColl.get('description'),
			title: evt.currentTarget.fullname.value
		}
		
		ACTIONS.sharePrayr(sharePrayrInfo)

		evt.currentTarget.reset()
	},

	render: function(){
		return (
				<div className="container-narrow signInView">
					<div className="signIn-header">
						<a href="#prayrs/inbox"><h1 id="iconLogo">PW</h1></a>
						<h3>Share Prayer</h3>
					</div>
					<div className="form-wrapper">
						<div className="form-body">
							<form onSubmit={this._getshareInfo} className="form-group  grid-container signIn-form">  
			   					<div className="form-field  sm-4-x-12 sm-4-x-12 sm-4-x-12 form-content"> 
			      					<label>Receiver Email Address</label> 
			      					<input type="email" name="email" placeholder="Enter Receiver Email Address"/>
			      					<label>Receiver Full Name</label>
									<input type="text" name="fullname" placeholder="Enter Receiver Full Name"/>
			      					<label>Enter Prayer</label> 
			      					<input type="text" name="description" value={`${this.props.prayrColl.get('description')}`}/> 
			      					<button href="#prayrs/inbox" className="btn md primary signInUpButton">Share Prayer</button> 
			   					</div>  
			   				</form>
			   			</div>
		   			</div>
		   			
				</div>
			)
	}
})

export default PrayrComposer
