import React from 'react'
import PostHeader from './postHeader'
import PRAYR_STORE from '../prayrStore'
import ACTIONS from '../actions'
import Sidebar from './sidebar'
import SidebarToggler from './sidebar-toggler'
import {User, PrayrCollection} from '../models/models'


const DashBoard = React.createClass({
	
	getInitialState: function() {
		return PRAYR_STORE._getData()
	},

	componentWillMount: function(){

		ACTIONS.fetchPrayrsByQuery()
		
		PRAYR_STORE.on('updatePrayrList', () => {
			this.setState(PRAYR_STORE._getData())
		})
	},

	componentWillUnmount: function(){
		PRAYR_STORE.off('updatePrayrList')
	},

	render: function(){
		console.log('state in dashboard', this.state.prayrCollection)
		return (
				<div>
					<PostHeader />
					<input type="checkbox" className="sidebar-toggler"/>
					<SidebarToggler/>
					<Sidebar />
					<Menu />
					{/*<PrayrSummary prayrColl={this.state.prayrCollection}/>*/}
				</div>
			)
	}
		
})


const Menu = React.createClass({
    render: function(){
        return (
        		<div className="container-full">
        			<div className=" container-narrow txt-right label-muted">
	   					<h4>Home</h4>
	   				</div>
                    <div className="container-full home-features">
                    	<div className="container-narrow">
                    		<div className="txt-center padHeader">
	   							<h2 id="colorBlue">Welcome home... Click a box to navigate! </h2>
	   						
	   						</div>
                    	</div>
						<div className="container-narrow">	
						
							<section className="segment">
								<div className="grid-container">
									<div className="sm-12-x-12 md-6-x-12 project-description">
								        
								            <a href="#prayrs/inbox" id="colorWhite">Inbox</a>
								        
								    
        							</div>
        							<div className="sm-12-x-12 md-6-x-12 project-description">
								        
								            <a href="#prayrs/compose" id="colorWhite">Compose</a>
								        

								        
        							</div>
								</div>
								
								<div className="grid-container">
									<div className="sm-12-x-12 md-6-x-12 project-description">
								        
								            <a href="#prayrs/sent" id="colorWhite">Sent</a>
								        
								        
        							</div>
        							<div className="sm-12-x-12 md-6-x-12 project-description">
								        
								            <a href="#prayrs/answered" id="colorWhite">Answered</a>
								        
								        
        							</div>
								</div>
							</section>
						</div>
					</div>
				</div>
				)
    }
})
	

export default DashBoard
