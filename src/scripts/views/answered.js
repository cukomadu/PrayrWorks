import React from 'react'
import $ from 'jquery'
import PostHeader from './postHeader'
import SidebarToggler from './sidebar-toggler'
import Sidebar from './sidebar'
import {User, PrayrCollection} from '../models/models'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'

const Answered = React.createClass({

	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){
		//console.log('fetching prayers >> pryrs.js 15')
		//console.log('this is clickedView in state passed from store line 16', this.state.currentView)
		
		var TrackPrayrs = {
			to: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPrayrsByQuery(TrackPrayrs)
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')

	},

	render: function(){

		let collectionToPassDown 

			collectionToPassDown = this.state.prayrCollection.filter((model) => {
				if((model.get('to') === User.getCurrentUser().email) && (model.get('answered') === true) ){
					return true
				} else {
					collectionToPassDown = this.state.prayrCollection
				}
			})

		return (
				<div>
					<PostHeader />
					<input type="checkbox" className="sidebar-toggler"/>
					<SidebarToggler/>
					<Sidebar />
		
					<TrackPrayrs prayrColl={collectionToPassDown} 
					pDisplay={this.state.pDisplay} buttonState={this.state.buttonState}/>
				</div>
			)
	}
})


const TrackPrayrs = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPrayrModel = prayrColl.map((model) => {
			return <TrackPrayrItem key={model.id} prayrmodel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		}).reverse()
		return JSXPrayrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div className="container-full">
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 label-muted txt-right">
									<h4>Answered Prayers</h4>
								</div>
							</div>
						</div>
					</section>
					<div className="container-narrow">
						<div className="txt-left padHeader">
	   							<h2 id="colorBlue">Prayer really works... Here are your answered prayers! </h2>
	   						
	   					</div>
					</div>
					{this._createPryr(this.props.prayrColl)}
				</div>
			)
	}
})

const TrackPrayrItem = React.createClass({

	_toggleAnswered: function(){
		console.log('i was clicked')
		//console.log('answered status pryrs line 65', this.props.pryrmodel.get('answered'))
		var clickedModelId = this.props.prayrmodel.id
		//console.log(clickedModelId)
		ACTIONS.updatePrayrModel(clickedModelId)
	},

	_deletePrayr: function(){
		var clickedModelId = this.props.prayrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	render: function(){
		var styleObj = {
			display: this.props.modelDisplay
		}

		var answeredClass
			

		if(this.props.prayrmodel.get('answered') === true){
			answeredClass = 'Answered'
			
		} else if (this.props.prayrmodel.get('answered') === false){
			answeredClass = 'UnAnswered'
			
		}
		console.log(answeredClass)
		this.props.prayrmodel.get('answered')

		return (
				<div className="container-narrow">
					<div className="grid-container" id="quick-add">
						
						<div className="form-field  lg-12-x-12" >
								<h3>{`From: ${this.props.prayrmodel.get('from')}`}</h3>
								<h3>{`Subject: ${this.props.prayrmodel.get('title')}`}</h3>
								<h3>{`Details: ${this.props.prayrmodel.get('description')}`}</h3>
								
							</div>
							
							<div className="sm-3-x-12">
								<button className={answeredClass} onClick={this._toggleAnswered}>{answeredClass}</button>
								
							</div>
							
							<div className=" sm-3-x-12">
								<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
							</div>
						
					</div>

				</div>
			)
	}
})


export default Answered
