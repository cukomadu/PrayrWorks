import React from 'react'
import ACTIONS from '../actions'
import PreHeader from './preHeader'

//<PreHeader />

const SignUp = React.createClass({
	render: function(){
		return (
				<div className="SignUp">
					
					<SignUpForm />
				</div>
			)
	}
})

const SignUpForm = React.createClass({

	_getSignUpInfo: function(evt){
		evt.preventDefault()
		
		ACTIONS.signUserUp({
			email: evt.currentTarget.email.value, 
			password: evt.currentTarget.password.value
		})

		evt.currentTarget.reset()
	},

	render: function(){
		return (
				<div className="container-narrow signInView">
					<div className="signIn-header">
						<a href="#home"><h1 id="iconLogo">PW</h1></a>
						<h3>Create Account</h3>
					</div>
					<div className="form-wrapper">
						<div className="form-body">
							<form onSubmit={this._getsignInInfo} className="form-group  grid-container signIn-form">  
			   					<div className="form-field  sm-4-x-12 sm-4-x-12 sm-4-x-12 form-content"> 
			      					<label>Your Email Address</label> 
			      					<input type="email" name="email" placeholder="Email Address"/>
			      					<label>Create a password</label> 
			      					<input type="password" name="password" placeholder="Password"/> 
			      					<button className="btn md primary signInUpButton">Create Account</button> 
			   					</div>  
			   				</form>
			   			</div>
		   			</div>
		   			<div className="signInFooter Text">
						<label>Already have an account?</label>
					</div>
					<div className="signInFooter Link">
						<a href="#signIn">Sign In</a>
					</div>
				</div>
			)
	}
})

export default SignUp
