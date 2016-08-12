import React from 'react'
import ACTIONS from '../actions'

const SidebarToggler = React.createClass({
	
	render: function(){
		return(
				<div className="sidebar-arrow">
				  <span className="line"></span>
				  <span className="line"></span>  
				  <span className="line"></span>    
				</div>

			)
	}		
})

export default SidebarToggler
