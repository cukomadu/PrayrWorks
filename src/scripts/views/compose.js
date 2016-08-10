import React from 'react'
import ACTIONS from '../actions'
import PostHeader from './postHeader'
import { User, PrayrModel } from '../models/models'

const Compose = React.createClass({

	render: function(){
		return (
				<div>
					<PostHeader />
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
			title: evt.currentTarget.title.value,
			description: evt.currentTarget.description.value
		})

		evt.currentTarget.reset()
	},


	render: function(){
		
		return (
				<div class="container-narrow">
   					<div>
   						<h3>Compose a prayer</h3>
   					</div>
   					<form class="form-group grid-container">
  
					   <div class="form-field sm-12-x-12 md-6-x-12">
					       <label >To </label>
					       <input type="email" name="email" placeholder="Enter Recipient Email Address"/>
					   </div>

					   <div class="sm-12-x-12 md-12-x-12 form-field">
					      <label>I Pray</label>
					      <textarea rows="6"> </textarea>
					   </div>
  
					   <div class="sm-6-x-12 md-6-x-12 form-field">
					       <input type="submit" class="btn md primary signInUpButton" value="submit" />
					   </div>

					</form>


				</div>
			)
	}
})

export default ComposePrayr

