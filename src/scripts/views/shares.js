import React from 'react'
import $ from 'jquery'
import PostHeader from './postHeader'
import {User, PrayrCollection} from '../models/models'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'

const Shares = React.createClass({

	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){
		//console.log('fetching prayers >> pryrs.js 15')
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
					<section className="section-label">  
			            <div className="container-narrow">
			                <div className="grid-container">
			                   	<div className="lg-12-x-12 label-muted">
									<h3>Shares</h3>
								</div>
							</div>
						</div>
					</section>
					<SharedPrayrs prayrColl={this.state.prayrCollection}/>
				</div>
			)
	}
})

const SharedPrayrs = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPrayrModel = prayrColl.map((model) => {
			return <PrayrItem key={model.id} prayrmodel={model} />
		})
		return JSXPrayrModel
	},

	render: function(){
		//console.log('this is pryr coll >>>', this.props.pryrColl)
		return (
				<div className="MyPrayrs">
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
			answeredStatusClass = "Yes"
			return <h3 className={answeredStatusClass}>"Answered"</h3>
		}
			answeredStatusClass = "notYet"
			return <h3 className={answeredStatusClass}>"Unanswered"</h3>		
	},

	render: function(){
		console.log(this.props.prayrmodel)

		return (

				<div className="container-narrow">
					<div className="grid-container" id="quick-add">
						
						<div className="form-field  lg-12-x-12" >
							<h3>{`Shared With: ${this.props.prayrmodel.get('title')}`}</h3>	
							<h3>{`Receiver Email: ${this.props.prayrmodel.get('to')}`}</h3>
							<h3>{`Shared Prayer: ${this.props.prayrmodel.get('description')}`}</h3>
							<h3>Track Status:{this._setStatus()}</h3>
							<div className=" sm-3-x-12 ">
								<button onClick={this._deletePrayr}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>
							</div>
						</div>
					</div>
				</div>
			)
	}
})


export default Shares