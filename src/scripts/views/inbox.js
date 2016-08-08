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
			return <p>You have shared a total of <a href="#prayrs/shares">{collLength} </a> prayer!</p>
		}
		else {
			return <p>You have shared a total of <a href="#prayrs/shares">{collLength} </a> prayers!</p>
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
			return <p>You recently added <a href="#prayrs/organize">{collLength} new</a> prayer to your prayer list!</p>
		}
		else {
			return <p>You recently added <a href="#prayrs/organize">{collLength} new</a> prayer to your prayer list!</p>
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
			return <p className="text-filtered">You have been mentioned in <a href="#prayrs/mentions">{collLength} new</a> prayer! </p>
		}
		else {
			return <p>You have been mentioned in <a href="#prayrs/mentions">{collLength} new</a> prayers!</p>
		}
	},

    render: function(){
        return (
                    <div>
                    	<section className="section-label">
                    		<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-12-x-12 label-muted">
										<h1>Inbox</h1>

									</div>
								</div>
							</div>
						</section>
						<section >
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-6-x-12">
					                    <h2>Prayers - <span id="subtitle">Your prayer list</span></h2>
					                    {this._calculateNewPryrs(this.props.prayrColl)}
					                    <button className="btn md primary" id="inboxButton">Add a prayer</button>
			                    	</div>
			                    	<div className="lg-6-x-12">
										<h2>&nbsp;</h2>
									<div className="addImg"></div>
								</div>
			                    </div>
			                </div>
		                </section>
		                <section >
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-6-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>
		                    		<div className="lg-6-x-12">
					                    <h2>Mentions - <span id="subtitle">Someone is praying for you</span></h2>
					                   
					                    {this._calculateMyAnswered(this.props.prayrColl)}
					                    <button className="btn md primary" id="inboxButton">See recent mentions</button>
			                    	</div>
									                   
			                    </div>
			                </div>
		                </section>
		                <section>
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-6-x-12">
					                    <h2>Shares - <span id="subtitle">Let them know you are praying</span></h2>
					                    
					                    {this._calculateSharedAnswered(this.props.prayrColl)}
					                    <button className="btn md primary" id="inboxButton">Share a prayer</button>
			                    	</div>
			                    	<div className="lg-6-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>
			                  
			                    </div>
			                </div>
		                </section>
		                <section>
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-6-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>
		                    		<div className="lg-6-x-12">
					                    <h2>Track - <span id="subtitle">Your answered prayers</span></h2>
					                    {this._calculateMyAnswered(this.props.prayrColl)}
					                    <button className="btn md primary" id="inboxButton">See recent answers</button>
			                    	</div>
			                    
			                    </div>
			                </div>
		                </section>
                    </div>
            )
    }

})
	

export default Inbox
