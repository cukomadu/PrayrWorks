import React from 'react'
import PostHeader from './postHeader'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'
import Sidebar from './sidebar'
import {User, PrayrCollection} from '../models/models'


const DashBoard = React.createClass({
	
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
					<Sidebar />
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
			return <p className="text-filtered">You have shared a total of <a href="#prayrs/shares">{collLength} </a> prayer!</p>
		}
		else {
			return <p className="text-filtered">You have shared a total of <a href="#prayrs/shares">{collLength} </a> prayers!</p>
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
			return <p className="text-filtered">You have <a href="#prayrs/organize">{collLength} new</a> prayer in your inbox!</p>
		}
		else {
			return <p className="text-filtered">You have <a href="#prayrs/organize">{collLength} new</a> prayers in your inbox!</p>
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
			return <p className="text-filtered">You have been mentioned in <a href="#prayrs/mentions">{collLength} new</a> prayers!</p>
		}
	},

    render: function(){
        return (
                    <div>
                    	<section className="section-label">  
		                    	<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div className="lg-12-x-12 label-muted">
										<h1>Welcome, {`${User.getCurrentUser().name}`}</h1>

									</div>
								</div>
							</div>
						</section>
						<section >
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div id="welcome-page" className="lg-12-x-12">
					                    <h2>Inbox - <span id="subtitle">Someone is praying for you</span></h2>
					                    {this._calculateNewPryrs(this.props.prayrColl)}
					                    <a href="#prayrs/add" className="btn md primary" id="inboxButton">View Inbox</a>
			                    	</div>
			                    	<hr/>
			                    	{/*<div className="lg-12-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>*/}
						
			                    </div>
			                </div>
		                </section>
		                <section >
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		{/*<div className="lg-12-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>*/}
		                    		<div id="welcome-page" className="lg-12-x-12">
					                    <h2>Sent Prayers - <span id="subtitle">Let them know you are praying</span></h2>
					                   
					                    {this._calculateMyAnswered(this.props.prayrColl)}
					                    <a href="#prayrs/mentions" className="btn md primary" id="inboxButton">View Sent</a>
			                    	</div>
									<hr/>              
			                    </div>
			                </div>
		                </section>
		                <section>
							<div className="container-narrow">
		                    	<div className="grid-container">
		                    		<div id="welcome-page" className="lg-12-x-12">
					                    <h2>Answered Prayers - <span id="subtitle">Prayer really works</span></h2>
					                    
					                    {this._calculateSharedAnswered(this.props.prayrColl)}
					                    <a href="#prayrs/shares" className="btn md primary" id="inboxButton">View Answered</a>
			                    	</div>
			                    	{/*<div className="lg-12-x-12">
										<h2>&nbsp;</h2>
										<div className="addImg"></div>
									</div>*/}
			                  
			                    </div>
			                </div>
		                </section>
		               
                    </div>
            )
    }

})
	

export default DashBoard
