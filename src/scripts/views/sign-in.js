import React from 'react'
import ACTIONS from '../actions'
import PreHeader from './preHeader'

//<PreHeader />

const SignIn = React.createClass({

	render: function(){
		console.log("shwoing SINGNIN FORM!");

		return (
				<div className="SignIn">
					
					<SignInForm />
				</div>
			)
	}
})

const SignInForm = React.createClass({

	_getsignInInfo: function(evt){
		evt.preventDefault();
		
		console.log("sendint data to actions", evt.currentTarget.email)
		ACTIONS.signUserIn(evt.currentTarget.email.value, evt.currentTarget.password.value, 'prayrs/dashboard')

		evt.currentTarget.reset()
	},

	render: function(){
		console.log('hellooooo');
		return (
				<div className="container-narrow signInView">
					<div className="signIn-header">
						<a href="#home"><h1><span id="leftLogo">Prayr</span><span id="rightLogo">Works</span></h1></a>
						<h3 id="colorBlue">Sign In</h3>
					</div>
					<div className="form-wrapper">
						<div className="form-body">
							<form onSubmit={this._getsignInInfo} className="form-group  grid-container signIn-form">  
			   					<div className="form-field  sm-4-x-12 sm-4-x-12 sm-4-x-12 form-content"> 
			      					<label>Email address or username</label> 
			      					<input type="email" name="email" placeholder="Email Address"/>
			      					<label>Password</label> 
			      					<input type="password" name="password" placeholder="Password"/> 
			   						<input type="submit" className="btn md primary signInUpButton" value="Sign In"/>
			   					</div>  
			   				</form>
			   			</div>
		   			</div>
		   			<div className="signInFooter Text">
						<label>Don't have an account?</label>
					</div>
					<div className="signInFooter Link">
						<a href="#signUp">Create Account</a>
					</div>
				</div>
			)
	}
})

export default SignIn