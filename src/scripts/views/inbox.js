import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import Sidebar from './sidebar'
import SidebarToggler from './sidebar-toggler'
import { User, PrayrModel } from '../models/models'
import PRAYR_STORE from '../prayrStore'

//edit - <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//share - <i class="fa fa-share-square-o" aria-hidden="true"></i>
//<label>Add a prayer</label>

const Inbox = React.createClass({
	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){

		
		var toMePrayrQuery = {
			to: User.getCurrentUser().email
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
		let collectionToPassDown = this.state.prayrCollection
		console.log(this.state.currentView)
		//if(this.state.currentView === "allpryrstome"){
			collectionToPassDown = this.state.prayrCollection.where({
				answered: false
			})
	//	}
		console.log("colllection passed down??", collectionToPassDown)
			
		return (
				<div>
					<PostHeader />
					<input type="checkbox" className="sidebar-toggler"/>
					<SidebarToggler/>
					<Sidebar />
					
					<PrayrDetailView prayrColl={collectionToPassDown} />
				</div>
			)
	}
})



const PrayrDetailView = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPryrModel = prayrColl.map((model) => {
			return <PrayrDetailItem key={model.id} prayrmodel={model} 
			modelDisplay={this.props.pDisplay} 
			modelButtonState={this.props.buttonState}/>
		}).reverse()

		return JSXPryrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div className="container-full">
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 txt-right label-muted">
									<h4>Inbox</h4>
								</div>
							</div>
						</div>
					</section>
					<div className="container-narrow">
						<div className="grid-container">
							<div className="txt-left padHeader">
	   							<h2 id="colorBlue">Someone is praying for you... Put a smile on! </h2>
	   						
	   						</div>
							{this._createPryr(this.props.prayrColl)}
						</div>
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
		console.log('i was clicked')
		//console.log('answered status pryrs line 65', this.props.pryrmodel.get('answered'))
		var clickedModelId = this.props.prayrmodel.id
		//console.log(clickedModelId)
		ACTIONS.updatePrayrModel(clickedModelId)
	},

	_deletePrayr: function(){
		console.log('i was clicked', this.props.prayrmodel.id)
		var clickedModelId = this.props.prayrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	render: function(){
		var answeredClass
			

		if(this.props.prayrmodel.get('answered') === true){
			answeredClass = 'Answered'
			
		} else if (this.props.prayrmodel.get('answered') === false){
			answeredClass = 'UnAnswered'
			
		}
		console.log(answeredClass)
		this.props.prayrmodel.get('answered')
		return (
				<div className="container-full">
					<div className="container-narrow">
						<div className="grid-container" id="quick-add">
							
							<div className="lg-12-x-12 inbox-prayr" >
								<h3>{`From: ${this.props.prayrmodel.get('from')}`}</h3>
								<h3>{`Subject: ${this.props.prayrmodel.get('title')}`}</h3>
								<h3>{`Details: ${this.props.prayrmodel.get('description')}`}</h3>
								
							</div>
							
							<div className="sm-3-x-12">
								<button className={answeredClass} onClick={this._toggleAnswered}>{answeredClass}</button>
								{/*<input className={answeredClass} type="checkbox" onClick={this._toggleAnswered} />*/}
							</div>
							
							<div className=" sm-3-x-12">
								<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
							</div>
							
						</div>

					</div>
				</div>
			)
	}
})

export default Inbox
