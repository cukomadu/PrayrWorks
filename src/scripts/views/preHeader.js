import React from 'react'
import ACTIONS from '../actions'


//<img src="./images/prayrworks-logo.png" alt="PrayrWorks" className="site-nav-logo"/>


const PreHeader = React.createClass({

	render: function(){
		return(
				<nav className="nav-bar with-logo site-nav-style">
					<div className="nav-logo">
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

				    <div className="nav-list">
				      <a href="#signIn">Sign In</a>
				      <a href="#add-section">Tour</a>
				    </div>
					
				</nav>
			)
	}		
})

export default PreHeader