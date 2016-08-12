import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import { User, PersonalPrayrCollection } from '../models/models'
import PRAYR_STORE from '../prayrStore'
import Sidebar from './sidebar'
import SidebarToggler from './sidebar-toggler'


//edit - <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//share - <i class="fa fa-share-square-o" aria-hidden="true"></i>
//<label>Add a prayer</label>

const MyPrayrList = React.createClass({
	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){

		
		var personalPrayrQuery = {
			to: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPersonalPrayrs(personalPrayrQuery)
		
		PRAYR_STORE.on('updatePrayrList', () => {
			console.log('updating Personal PrayrList!')
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')

	},

	render: function(){
		let collectionToPassDown = this.state.personalPrayrCollection

		// if(this.state.currentView === "allpryrstome"){
		// 	collectionToPassDown = this.state.prayrCollection.where({
		// 		answered: false
		// 	})
		// }
			
		return (
				<div>
					<PostHeader />
					<input type="checkbox" className="sidebar-toggler"/>
					<SidebarToggler/>
					<Sidebar />
					<div className="container-full">
						<QuickAddPrayr />
						<PrayrListView personalPrayrColl={collectionToPassDown}/>
					</div>
				</div>
			)
	}
})

const QuickAddPrayr = React.createClass({

	_getUserInput: function(evtObj){
        if(evtObj.keyCode === 13){
            var userEntry = evtObj.target.value
            console.log(userEntry)

            ACTIONS.savePersonalPrayrModel({
            	to: User.getCurrentUser().email,           	
				description: userEntry
			})
            
            evtObj.target.value = ''
        }
    },

	render: function(){
		return (
				<div className="container-full">
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 txt-right label-muted">
									<h4>Personal Prayer List </h4>
								</div>
							</div>
						</div>
					</section>
					<section className="section-label">
						<div className="container-narrow">
							<div className="grid-container">
								<div className="lg-12-x-12 input-add">
									<div className="txt-left padHeader">
	   									<h2 id="colorBlue">Create personal prayers... Add a prayer to your list! </h2>
	   								</div>
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

	_createPryr: function(coll){
		var JSXPryrModel = coll.map((model) => {
			return <PrayrItem key={model.id} personalPrayrModel={model} modelDisplay={this.props.pDisplay} modelButtonState={this.props.buttonState}/>
		})
		return JSXPryrModel
	},

	render: function(){
		console.log('this is pryr coll >>>', this.props.personalPrayrColl)
		return (
				<div className="container-full">
					<div className="container-narrow">
						<div className="grid-container">
						
							{this._createPryr(this.props.personalPrayrColl)}
						</div>
					</div>
				</div>
			)
	}
})

const PrayrItem = React.createClass({

	_deletePrayr: function(){
		console.log('i was clicked')
		var clickedModelId = this.props.personalPrayrModel.id
		ACTIONS.deletePersonalPrayrModel(clickedModelId)
	},

	_toggleAnswered: function(){
		console.log('i was clicked')
		//console.log('answered status pryrs line 65', this.props.pryrmodel.get('answered'))
		var clickedModelId = this.props.personalPrayrModel.id
		//console.log(clickedModelId)
		ACTIONS.updatePersonalPrayrModel(clickedModelId)
	},


	render: function(){
		let answeredClass, answeredTxt
		if ( this.props.personalPrayrModel.get('answered') ) {
			answeredClass = "bg-success"
			answeredTxt = "Answered"		
		} else {
			answeredClass = "bg-warn"
			answeredTxt = "Unanswered"	
		}

		return (
				<div className="container-narrow">
					<div className="grid-container" id="quick-add">
						
						<div className="form-field  lg-12-x-12" >
							<h3>{this.props.personalPrayrModel.get('description')}</h3>	
						</div>

						<div className="sm-3-x-12">
							<button className={answeredClass} onClick={this._toggleAnswered}>{answeredTxt}</button>
						</div>
						
						<div className=" sm-3-x-12 ">
							<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
						</div>
						
					</div>

				</div>
			)
	}
})

export default MyPrayrList
