import React from 'react'
import $ from 'jquery'
import PostHeader from './postHeader'
import {User, PrayrCollection} from '../models/models'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'

const Mentions = React.createClass({

	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){
		//console.log('fetching prayers >> pryrs.js 15')
		//console.log('this is clickedView in state passed from store line 16', this.state.currentView)
		
		var PrayrMentions = {
			//to: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPrayrsByQuery(PrayrMentions)
		
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
				if((model.get('from') !== User.getCurrentUser().email) && (model.get('answered') === false) ){
					return true
				} else {
					collectionToPassDown = this.state.prayrCollection
				}
			})

		return (
				<div>
					<PostHeader />
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 label-muted">
									<h3>Mentions</h3>
								</div>
							</div>
						</div>
					</section>
					<PrayrMentions prayrColl={collectionToPassDown} 
					pDisplay={this.state.pDisplay} buttonState={this.state.buttonState}/>
				</div>
			)
	}
})


const PrayrMentions = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPrayrModel = prayrColl.map((model) => {
			return <PrayrItem key={model.id} prayrmodel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		})
		return JSXPrayrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div>
					{this._createPryr(this.props.prayrColl)}
				</div>
			)
	}
})

const PrayrItem = React.createClass({

	

	_deletePrayr: function(){
		var clickedModelId = this.props.pryrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	render: function(){
		var styleObj = {
			display: this.props.modelDisplay
		}

		return (
				<div className="container-narrow">
					<div className="grid-container" id="quick-add">
						
						<div className="form-field  lg-12-x-12" >
							<h3>{`Mentioned By: ${this.props.prayrmodel.get('title')}`}</h3>	
							<h3>{`Sender Email: ${this.props.prayrmodel.get('to')}`}</h3>
							<h3>{`Details: ${this.props.prayrmodel.get('description')}`}</h3>
							<h3>{`Track Status: ${this.props.prayrmodel.get('answered')}`}</h3>
						</div>
						
						<div className=" sm-3-x-12 ">
							<button onClick={this._organizePrayr}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
						</div>
						
						<div className=" sm-3-x-12 ">
							<button onClick={this._sharePrayr}><i className="fa fa-share-square-o fa-2x" aria-hidden="true"></i></button>
						</div>
						
						<div className=" sm-3-x-12 ">
							<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
						</div>
						
					</div>

				</div>
			)
	}
})


export default Mentions
