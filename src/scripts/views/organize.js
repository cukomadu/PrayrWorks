import React from 'react'
import $ from 'jquery'
import PostHeader from './postHeader'
import {User, PrayrCollection} from '../models/models'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'

const Organize = React.createClass({

	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){
		//console.log('fetching prayers >> pryrs.js 15')
		//console.log('this is clickedView in state passed from store line 16', this.state.currentView)
		
		var toMePrayerQuery = {
			to: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPrayrsByQuery(toMePrayerQuery)
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')

	},

	render: function(){

		let collectionToPassDown 
		
		if(this.state.currentView === "mypryrlist"){
			collectionToPassDown = this.state.prayrCollection.where({
				from: User.getCurrentUser().email, answered: false
			})
		} 
		
		else if(this.state.currentView === "answered"){
			collectionToPassDown = this.state.prayrCollection.where({
				answered: true
			})
		}
		
		else if(this.state.currentView === "pryrstomefromothers"){

			collectionToPassDown = this.state.prayrCollection.filter((model) => {
				if((model.get('from') !== User.getCurrentUser().email) && (model.get('answered') === false) ){
					return true
				}
			})
		}
		
		else {
			collectionToPassDown = this.state.prayrCollection.where({
				answered: false
			})
			
		}
		

		return (
				<div className="Pryrs">
					<PostHeader />
					<hr />
					<h3>Organize {/*<span className="HeadingToMe">{`To Me <= From Others`}</span>*/}</h3>

					<NavBar />
					<ToMePryrs prayrColl={collectionToPassDown} 
					pDisplay={this.state.pDisplay} buttonState={this.state.buttonState}/>
				</div>
			)
	}
})

const NavBar = React.createClass({

	_getCurrentView: function(evt){
		console.log('this is current viewType', evt.target.value)
		var clickedView = evt.target.value

		ACTIONS.updateCurrentView(clickedView)
	},


    render: function(){
        return (
                    <div>
                    	<button 
						value="allpryrstome"
						onClick={this._getCurrentView}
						>All Prayers To Me</button>
						
						<button  
						value="mypryrlist"
						onClick={this._getCurrentView}
						>My Prayer List </button>
						
						<button 
						value="pryrstomefromothers"
						onClick={this._getCurrentView}
						>Prayers To Me from Other</button>
						
						<button 
						value="answered"
						onClick={this._getCurrentView}
						>Answered</button>
                    </div>
            )
    }

})

const ToMePryrs = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPryrModel = prayrColl.map((model) => {
			return <PryrItem key={model.id} prayrmodel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		})
		return JSXPryrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div className="MyPryrs">
					{this._createPryr(this.props.prayrColl)}
				</div>
			)
	}
})

const PryrItem = React.createClass({

	_toggleDisplay: function(){
		console.log('buttonState', this.props.modelButtonState)
		console.log('pDisplay', this.props.modelDisplay)

		var pDisplay = this.props.modelDisplay,
			buttonState = this.props.modelButtonState,
			clickedModelId = this.props.pryrmodel.id

		ACTIONS.updateViewedStatus(clickedModelId)

		ACTIONS.updateStateProps(buttonState, pDisplay)
	},

	_toggleAnswered: function(){
		//console.log('answered status pryrs line 65', this.props.pryrmodel.get('answered'))
		var clickedModelId = this.props.pryrmodel.id
		//console.log(clickedModelId)
		
		ACTIONS.updatePrayrModel(clickedModelId)
	},

	_deletePrayr: function(){
		var clickedModelId = this.props.pryrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	render: function(){
		var styleObj = {
			display: this.props.modelDisplay
		}

		return (
				<div className="ToMePrayers">
					<p><strong className="labelToMe">To Me:</strong> {this.props.prayrmodel.get('to')}</p>
					<button onClick={this._toggleDisplay} className="expand">{this.props.modelButtonState}</button>
					<div style={styleObj}>
						<p><strong className="labelToMe">From Me / From Other Users:</strong> {this.props.prayrmodel.get('from')}</p>
						<p><strong className="labelToMe">Prayer Title:</strong> {this.props.prayrmodel.get('title')}</p>
						<p><strong className="labelToMe">Prayer Details:</strong> {this.props.prayrmodel.get('description')}</p>
						<span className="HeadingFromMe">Answered?</span>
						<input type="checkbox" name="answered" onClick={this._toggleAnswered} />
						<button onClick={this._deletePrayr}>X</button>
					</div>
				</div>
			)
	}
})


export default Organize
