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
	   							<h2 id="colorBlue">Thank you for sharing... <a href="#prayrs/compose" id="atag">Send Another Prayer!</a></h2>
	   						
	   					</div>
	   					<div className="table-full-width" id="quick-add">

								<table className="increaseWidth">

								   <thead>
								      <tr>
								         <th>To</th>
							         	 <th>Subject</th>
							         	 <th>Description</th>
							         	 <th>Status</th>
							        	 <th>Delete</th>    
								      </tr>
								   </thead>
								   <tbody>
								   		{this._createPryr(this.props.prayrColl)}
								   </tbody>

								</table>
							</div>
					</div>
					{/*this._createPryr(this.props.prayrColl)*/}
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
			return <span className={"bg-inverted"}>Unanswered</span>		
	},

	render: function(){
		console.log(this.props.prayrmodel)

		return (
			    
		      <tr>
		         <td>{this.props.prayrmodel.get('to')}</td>
		         <td>{this.props.prayrmodel.get('title')}</td>
		         <td>{this.props.prayrmodel.get('description')}</td>
		         <td>{this._setStatus()}</td>
		         <td><button id="borderNone" onClick={this._deletePrayr}><i id="borderNone" className="fa fa-trash fa-2x" aria-hidden="true"></i></button></td>
		      </tr>
							   
			)
	}
})


export default Sent