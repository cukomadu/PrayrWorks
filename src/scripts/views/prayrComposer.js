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