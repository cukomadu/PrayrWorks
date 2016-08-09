import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import { User, PrayrModel } from '../models/models'
import PRAYR_STORE from '../prayrStore'

//edit - <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//share - <i class="fa fa-share-square-o" aria-hidden="true"></i>
//<label>Add a prayer</label>

const Organize = React.createClass({
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
				<div>
					<PostHeader />
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 label-muted">
									<h1>Organize</h1>
								</div>
							</div>
						</div>
					</section>
					<PrayrDetailView prayrColl={collectionToPassDown}/>
				</div>
			)
	}
})



const PrayrDetailView = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPryrModel = prayrColl.map((model) => {
			return <PrayrDetailItem key={model.id} prayrmodel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		})
		return JSXPryrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div className="container-narrow">
					<div className="grid-container">
						<div className="lg-12-x-12 label-muted">
							<h2>Your Prayer List</h2>
						</div>
						{this._createPryr(this.props.prayrColl)}
					</div>
				</div>
			)
	}
})

const PrayrDetailItem = React.createClass({

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

	_organizePrayr:function(){
		console.log('i was clicked')
		location.hash = "prayrs/organize"
	},

	_sharePrayr: function(){
		console.log('i was clicked')
		location.hash = "prayrs/prayrComposer"	
	},

	_deletePrayr: function(){
		console.log('i was clicked')
		var clickedModelId = this.props.prayrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	render: function(){
		
		return (
				<div className="container-narrow">
					<div className="grid-container" id="quick-add">
						
						<div className="form-field  lg-12-x-12" >
							
							<h3>{`Details: ${this.props.prayrmodel.get('description')}`}</h3>
							<h3>{`Answered: ${this.props.prayrmodel.get('answered')}`}</h3>
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

export default Organize
