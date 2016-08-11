import React from 'react'
import ACTIONS from '../actions'
import { User, PrayrModel } from '../models/models'

const PostHeader = React.createClass({

	_handleSignOut: function(){
		ACTIONS.signUserOut(User.getCurrentUser().name)
	},
	
	render: function(){
		return(
				<nav className="nav-bar with-logo site-nav-style">
					<div className="nav-logo logo">
						<a href="#home">
							<h1><span id="leftLogo">Prayr</span><span id="rightLogo">Works</span></h1>
						</a>
					</div>
					<input type="checkbox" className="hamburger-toggler"/>

				    <div className="hamburger-menu">
				      <span className="line"></span>
				      <span className="line"></span>
				      <span className="line"></span>
				    </div>

				    <div className="nav-list" id="nav-color">
					   	<a href="#" onClick={this._handleSignOut} >Sign Out</a>
					   	<span id="colorBlue">Welcome, {`${User.getCurrentUser().name}`}</span>
					   {/*	<a href="#prayrs/track">Track</a>
					   	<a href="#prayrs/shares">Shares</a>
					   	<a href="#prayrs/mentions">Mentions</a>
					   	<a href="#prayrs/organize">Organize</a>
					    <a href="#prayrs/add">Add</a>
					    <a href="#prayrs/inbox">Inbox</a> */}	
				    </div>
					
				</nav>
			)
	}		
})

export default PostHeader
