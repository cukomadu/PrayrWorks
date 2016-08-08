import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import { User, PrayrModel, PrayrCollection } from './models/models'
import Home from './views/home'
import SignIn from './views/signIn'
import SignUp from './views/signUp'
import Inbox from './views/inbox'
import Add from './views/add'
import Organize from './views/organize'
import Shares from './views/shares'
import Mentions from './views/mentions'
import Track from './views/track'



const app = function() {
  	const PrayrRouter = Backbone.Router.extend({
	  	routes: {
	  		"home": "_showHome",
	  		"signIn": "_showSignIn",
	  		"signUp": "_showSignUp",
	  		"prayrs/inbox": "_showInbox",
	  		"prayrs/add": "_showAdd",
	  		"prayrs/organize": "_showOrganize",
	  		"prayrs/shares": "_showShares",
  			"prayrs/mentions": "_showMentions",
		    "prayrs/track": "_showTrack",
	  		"*catchall": "_redirect"
	  	},

	  	_showHome: function(){
	  		ReactDOM.render(<Home />, document.querySelector('.container'))
	  	},

	  	_showSignIn: function(){
  			ReactDOM.render(<SignIn />, document.querySelector('.container'))
  		},

  		_showSignUp: function(){
  			ReactDOM.render(<SignUp />, document.querySelector('.container'))
  		},

  		_showInbox: function(){
		    if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
		      	ReactDOM.render(<Inbox />, document.querySelector('.container'))
    	},

    	_showAdd: function(){
      		if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Add />, document.querySelector('.container'))
  		},

  		_showOrganize: function(){
      		if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
      			ReactDOM.render(<Organize />, document.querySelector('.container'))
    	},

    	_showShares: function(){
      		if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Shares />, document.querySelector('.container'))
  		},

  		_showMentions: function(){
      		if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Mentions />, document.querySelector('.container'))
  		},

  		_showTrack: function(){
      		if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Track />, document.querySelector('.container'))
  		},

	  	_redirect: function(){
	  		location.hash = "home"
	  	},

	  	initialize: function(){
	  		Backbone.history.start()
	  	}
	})
  
  new PrayrRouter() 
}
  	

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..

