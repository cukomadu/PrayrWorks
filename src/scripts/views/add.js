import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import { User, PrayrModel } from '../models/models'
import PRAYR_STORE from '../prayrStore'

//edit - <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//share - <i class="fa fa-share-square-o" aria-hidden="true"></i>
//<label>Add a prayer</label>

const Add = React.createClass({
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
					<QuickAddPrayr />
					<PrayrListView prayrColl={collectionToPassDown}/>
				</div>
			)
	}
})

const QuickAddPrayr = React.createClass({

	_getUserInput: function(evtObj){
        if(evtObj.keyCode === 13){
            var userEntry = evtObj.target.value
            console.log(userEntry)

            ACTIONS.savePrayrModel({
            	//to: User.getCurrentUser().email,
            	//from: User.getCurrentUser().email,
				description: userEntry
			})
            
            evtObj.target.value = ''
        }
    },

	render: function(){
		return (
				<div>
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 label-muted">
									<h1>Add</h1>
								</div>
							</div>
						</div>
					</section>
					<section className="section-label">
						<div className="container-narrow">
							<div className="grid-container">
								<div className="lg-12-x-12 input-add">
									
									<input id="user-input"
				                    type="text" 
				                    name="description" 
				                    placeholder="Type a prayer and press enter" 
				                    onKeyDown={this._getUserInput}/>
				  					
				                </div>
			                </div>
						</div>
					</section>
				</div>
			)
	}
})

const PrayrListView = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPryrModel = prayrColl.map((model) => {
			return <PrayrItem key={model.id} prayrmodel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		})
		return JSXPryrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.prayrColl)
		return (
				<div className="container-narrow">
					<div className="grid-container">
						<div className="lg-12-x-12 label-muted">
							<h2>Quick Add List</h2>
						</div>
						{this._createPryr(this.props.prayrColl)}
					</div>
				</div>
			)
	}
})

const PrayrItem = React.createClass({

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
							<h3>{this.props.prayrmodel.get('description')}</h3>	
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

export default Add
