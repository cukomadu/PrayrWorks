import React from 'react'
import $ from 'jquery'
import PostHeader from './postHeader'
import SidebarToggler from './sidebar-toggler'
import Sidebar from './sidebar'
import {User, PrayrCollection} from '../models/models'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'

const Sent = React.createClass({

	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){
		console.log('fetching prayers >> pryrs.js 15')
		var PrayrShares = {
		    from: User.getCurrentUser().email
		}
		
		ACTIONS.fetchPrayrsByQuery(PrayrShares)
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')
	},

	render: function(){
		return (
				<div className="Pryrs">
					<PostHeader />
					<input type="checkbox" className="sidebar-toggler"/>
					<SidebarToggler/>
					<Sidebar />
					
					<SentPrayrs prayrColl={this.state.prayrCollection}/>
				</div>
			)
	}
})

const SentPrayrs = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPrayrModel = prayrColl.map((model) => {
			console.log("????")
			return <PrayrItem key={model.id} prayrmodel={model} />
		}).reverse()

		console.log(JSXPrayrModel)

		return JSXPrayrModel
	},

	render: function(){
		//console.log('this is pryr coll >>>', this.props.pryrColl)
		return (
				<div className="container-full">
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 txt-right label-muted">
									<h4>Sent Prayers</h4>
								</div>
							</div>
						</div>
					</section>
					<div className="container-narrow">
						<div className="txt-left padHeader">
	   							<h2 id="colorBlue">Sharing is caring... Here are your sent prayers! </h2>
	   						
	   					</div>
					</div>
					{this._createPryr(this.props.prayrColl)}
				</div>
			)
	}
})

const PrayrItem = React.createClass({
	

	_deletePrayr: function(){
		var clickedModelId = this.props.prayrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	_setStatus:function(){
		var answeredStatusClass

		if(this.props.prayrmodel.get('answeredStatus') === true){
			answeredStatusClass = "answered-per-receiver"
			return <span className={"bg-success"}>Answered</span>
		}
			answeredStatusClass = "unanswered-per-receiver"
			return <span className={"bg-warn"}>Unanswered</span>		
	},

	render: function(){
		console.log(this.props.prayrmodel)

		return (
			    <div className="container-full">

					<div className="container-narrow">
						<div className="grid-container" id="quick-add">
							<div className="form-field  lg-12-x-12" >	
								<h3>{`To: ${this.props.prayrmodel.get('to')}`}</h3>
								<h3>{`Subject: ${this.props.prayrmodel.get('title')}`}</h3>
								<h3>{`Description: ${this.props.prayrmodel.get('description')}`}</h3>
								<h3>Answer Status: {this._setStatus()}</h3>
								<div className=" sm-3-x-12 ">
									<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
	}
})


export default Sent