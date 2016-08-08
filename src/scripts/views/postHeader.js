import React from 'react'
import ACTIONS from '../actions'

const PostHeader = React.createClass({
	render: function(){
		return (
				<div className="PostHeader">
					<h1 id="Header"><a href="#home">PRAYRWorks</a></h1>
					<NavBar />
				</div>
			)
	}
})

const NavBar = React.createClass({

	render: function(){
		return (
				<div className="NavBar aLinks">
					<a className="button" href="#prayrs/add">Add</a>
					<a className="button actiontome" 
					href="#prayrs/organize">{`Organize`}</a>
					<a className="button actionfromme" 
					href="#prayrs/mentions">Mentions</a>
					<a className="button" href="#prayrs/shares">Shares</a>
					<a className="button" href="#prayrs/track">Track</a>
					<a className="button" href="#" onClick={ACTIONS.signUserOut} >Sign Out</a>
				</div>
			)
	}
})

export default PostHeader
