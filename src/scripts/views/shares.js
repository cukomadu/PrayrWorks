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
		var fromMePrayerQuery = {
		    from: User.getCurrentUser().email
		}

		ACTIONS.fetchPrayrsByQuery(fromMePrayerQuery)
		
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
					<hr />
					<h3>Shares{/*<span className="HeadingFromMe">From Me => To Others</span>*/}</h3>
					<FromMePryrs prayrColl={this.state.prayrCollection}/>
				</div>
			)
	}
})

const FromMePryrs = React.createClass({

	_createPryr: function(prayrColl){
		var JSXPryrModel = prayrColl.map((model) => {
			return <PryrItem key={model.id} prayrmodel={model} />
		})
		return JSXPryrModel
	},

	render: function(){
		//console.log('this is pryr coll >>>', this.props.pryrColl)
		return (
				<div className="MyPryrs">
					{this._createPryr(this.props.prayrColl)}
				</div>
			)
	}
})

const PryrItem = React.createClass({
	

	_deletePrayr: function(){
		var clickedModelId = this.props.prayrmodel.id
		ACTIONS.deletePrayrModel(clickedModelId)
	},

	_setStatus:function(){
		var answeredStatusClass

		if(this.props.prayrmodel.get('answeredStatus') === true){
			answeredStatusClass = "Yes"
			return <p className={answeredStatusClass}>"Yes"</p>
		}
			answeredStatusClass = "notYet"
			return <p className={answeredStatusClass}>"Not Yet"</p>		
	},

	render: function(){
		console.log(this.props.prayrmodel)

		return (
				<div className="FromMePrayers">
					<p><strong className="labelFromMe">From Me:</strong> {this.props.prayrmodel.get('from')}</p>
					<p><strong className="labelFromMe">To Other Users:</strong> {this.props.prayrmodel.get('to')}</p>
					<p><strong className="labelFromMe">Prayer Title:</strong> {this.props.prayrmodel.get('title')}</p>
					<p><strong className="labelFromMe">Prayer Details:</strong> {this.props.prayrmodel.get('description')}</p>
					<label>ANSWERED?{this._setStatus()}</label>
					{/*<select name="FromMePrayers" defaultValue={this._setStatus()}>
						<option disabled value="Pending">Pending</option>
						<option disabled value="Yes">Yes</option>
					</select>*/}

					<button onClick={this._deletePrayr}>X</button>
				</div>
			)
	}
})


export default Shares