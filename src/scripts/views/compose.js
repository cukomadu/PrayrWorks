import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import Sidebar from './sidebar'
import { User, PrayrModel } from '../models/models'


const Compose = React.createClass({

	render: function(){
		return (
				<div>
					<PostHeader />
					<Sidebar />
					<ComposePrayr />
				</div>
			)
	}
})


const ComposePrayr = React.createClass({

	_getPrayrInfo: function(evt){
		evt.preventDefault()
		
		ACTIONS.savePrayrModel({
			to: evt.currentTarget.to.value,
			from: User.getCurrentUser().email,
			description: evt.currentTarget.description.value
		})

		evt.currentTarget.reset()
	},


	render: function(){
		
		return (
				<div className="container-full">
					<div className="container-narrow">

	   					<div className="txt-right label-muted">
	   						<h1>Compose</h1>
	   					</div>
	   					<form onSubmit={this._getPrayrInfo} className="form-group grid-container">
	  
						   <div className="form-field sm-12-x-12 md-6-x-12">
						       <label >To </label>
						       <input type="email" name="to" placeholder="Enter recipient email address"/>
						   </div>
						   <div className="form-field sm-12-x-12 md-6-x-12">
						       <label >Subject</label>
						       <input type="text" name="title" placeholder="e.g. Job, Family, Life"/>
						   </div>

						   <div className="sm-12-x-12 md-12-x-12 form-field">
						      <label>Description</label>
						      <textarea rows="6" name="description" placeholder="Type your prayer here"></textarea>
						   </div>
	  
						   <div className="sm-6-x-12 md-6-x-12 form-field">
						       <input type="submit" id="colorOrange"className="btn md primary" value="Send Prayer" />
						   </div>

						</form>

					</div>
				</div>
			)
	}
})

export default Compose

