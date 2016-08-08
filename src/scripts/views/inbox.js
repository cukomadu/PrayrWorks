import React from 'react'
import PostHeader from './postHeader'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'
import {User, PrayrCollection} from '../models/models'


const Inbox = React.createClass({
	
	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){

		ACTIONS.fetchPrayrsByQuery()
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')
	},

	render: function(){
		console.log('state in dashboard', this.state.prayrCollection)
		return (
				<div>
					<PostHeader />
					<hr />
					<h3>Prayer Inbox</h3>
					<PrayrSummary prayrColl={this.state.prayrCollection}/>
				</div>
			)
	}
		
})

const PrayrSummary = React.createClass({

	_calculateSharedAnswered: function(prayrColl){
		var filteredColl = prayrColl.filter((model) => {
			if((model.get('from') === User.getCurrentUser().email) && (model.get('answeredStatus') === true)){
				return true
			}	
		})

		//return filteredColl.length
		var collLength = filteredColl.length
		console.log('this is collLength', collLength)
		if(collLength < 2){
			return <p>You Have <a href="#prayrs/shares">{collLength} New</a> Answered Prayer from Shared Prayers!</p>
		}
		else {
			return <p>You Have <a href="#prayrs/shares">{collLength} New</a> Answered Prayers from Shared Prayers!</p>
		}
        
	},

	_calculateNewPryrs: function(prayrColl){
		var filteredColl = prayrColl.filter((model) => {
			if((model.get('to') === User.getCurrentUser().email) && (model.get('viewStatus') === false)){
				return true
			}	
		})
		var collLength = filteredColl.length
		if(collLength < 2){
			return <p>You Have <a href="#prayrs/organize">{collLength} New</a> Prayer in your Inbox!</p>
		}
		else {
			return <p>You Have <a href="#prayrs/organize">{collLength} New</a> Prayers in your Inbox!</p>
		}
	},

	_calculateMyAnswered: function(prayrColl){
		var filteredColl = prayrColl.filter((model) => {
			if((model.get('to') === User.getCurrentUser().email) && (model.get('answered') === true)){
				return true
			}	
		})
		var collLength = filteredColl.length
		if(collLength < 2){
			return <p>You Have <a href="#prayrs/mentions">{collLength} New</a> Answered Prayer in your Inbox!</p>
		}
		else {
			return <p>You Have <a href="#prayrs/mentions">{collLength} New</a> Answered Prayer in your Inbox!</p>
		}
	},

    render: function(){
        return (
                    <div>
                    	<p>My Prayers</p>
                    	{this._calculateNewPryrs(this.props.prayrColl)}
                    	{this._calculateMyAnswered(this.props.prayrColl)}
                    	<hr/>
                    	<p>Shared Prayers</p>
                    	{this._calculateSharedAnswered(this.props.prayrColl)}
                    	{/*<p><a href="#pryrs/shared"> {this._calculatePryrStats(this.props.pryrColl)}
                    	  New</a> Answered Prayer from Shared Prayers</p>*/}
                    	<hr/>
                    </div>
            )
    }

})
	

export default Inbox
