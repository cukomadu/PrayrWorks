import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import { User, PrayrModel, PrayrCollection } from './models/models'
import Home from './views/home'
import SignIn from './views/sign-in'
import SignUp from './views/sign-up'
import DashBoard from './views/dashboard'
import Inbox from './views/inbox'
import Sent from './views/sent'
import Compose from './views/compose'
import Answered from './views/answered'
//import MyPrayrList from './views/myPrayr-list'



const app = function() {
  	const PrayrRouter = Backbone.Router.extend({
	  	routes: {
	  		"home": "_showHome",
	  		"signIn": "_showSignIn",
	  		"signUp": "_showSignUp",
	  		"prayrs/dashboard": "_showDashBoard",
	  		"prayrs/inbox": "_showInbox",
	  		"prayrs/sent": "_showSent",
        "prayrs/compose": "_showCompose",
		    "prayrs/answered": "_showAnswered",
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

  		_showDashBoard: function(){
		    //if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
		      	ReactDOM.render(<DashBoard />, document.querySelector('.container'))
    	},

  		_showInbox: function(){
      	//	if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
      			ReactDOM.render(<Inbox/>, document.querySelector('.container'))
    	},

    	_showSent: function(){
      		//if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Sent />, document.querySelector('.container'))
  		},

      _showCompose: function(){
          //if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
          ReactDOM.render(<Compose />, document.querySelector('.container'))
      },

  		_showAnswered: function(){
      		//if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
  				ReactDOM.render(<Answered />, document.querySelector('.container'))
  		},

      //  _showAdd: function(){
    //      //if(!User.getCurrentUser() && User.getCurrentUser() !== 'null' ){ return location.hash = "home"}
      //    ReactDOM.render(<Add />, document.querySelector('.container'))
      // },

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
// export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..

