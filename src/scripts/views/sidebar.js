import React from 'react'
import ACTIONS from '../actions'

const Sidebar = React.createClass({
	
	render: function(){
		var sidebarClass
		
		return(
				<aside className="sidebar sm">
				 
				  <div className="navbar-spacer"></div>

				  <div className="sidebar-content">
				    
				    <a className="sidebar-topic" href='#prayrs/dashboard'>Home</a>
				    <a className="sidebar-topic" href='#prayrs/inbox'>Inbox</a>
				    <a className="sidebar-topic" href='#prayrs/compose'>Compose</a>
				    <a className="sidebar-topic" href='#prayrs/sent'>Sent</a>
				    <a className="sidebar-topic" href='#prayrs/answered'>Answered</a>
				    <a className="sidebar-topic" href='#prayrs/myprayrlist'>My List</a>
				  </div>
				  
				</aside>
			)
	}		
})

export default Sidebar
