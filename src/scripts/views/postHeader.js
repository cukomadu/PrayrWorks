import React from 'react'
import ACTIONS from '../actions'

const PostHeader = React.createClass({
	
	render: function(){
		return(
				<nav className="nav-bar with-logo site-nav-style">
					<div className="nav-logo logo">
						<a href="#home">
							<h1><span id="leftLogo">PRAYR</span><span id="rightLogo">works</span></h1>
						</a>
					</div>
					<input type="checkbox" className="hamburger-toggler"/>

				    <div className="hamburger-menu">
				      <span className="line"></span>
				      <span className="line"></span>
				      <span className="line"></span>
				    </div>

				    <div className="nav-list" id="nav-color">
					   	<a href="#" onClick={ACTIONS.signUserOut} >Sign Out</a>
					   	<a href="#prayrs/track">Track</a>
					   	<a href="#prayrs/shares">Shares</a>
					   	<a href="#prayrs/mentions">Mentions</a>
					   	<a href="#prayrs/organize">Organize</a>
					    <a href="#prayrs/add">Add</a>
					    <a href="#prayrs/inbox">Inbox</a>

						
						
						
						
				    </div>
					
				</nav>
			)
	}		
})

export default PostHeader
