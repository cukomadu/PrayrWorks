import React from 'react'
import PreHeader from './preHeader'

const Home = React.createClass({

	render: function(){
		return(
				<div>
					<PreHeader />
					<div className="container-hero">
						<header className="hero">
							<div className="container-narrow hero-text">  
							     <h2 className="title">A simple way to organize your prayers.</h2>
							     <h4 className="subtitle">Compose, send and track all in one place...</h4>
							</div>
							<div className="container-narrow"> 
							 	 <a href="#signUp" id="hero-link" className="btn primary md">Create Free Account</a>
							</div>
						</header>
					</div>
					<section>
						<div className="container-narrow">
							<h1>Powerful Features, Simple Design!</h1>
							<div className="grid-container">
								<div id="add-section" className="lg-6-x-12">
									<h2>Create a prayer</h2>
									<p className="alt-font">
										Creating a prayer is simple and easy.
										Access it wherever you go, forever.
									</p>
								</div>
								<div className="lg-6-x-12">
									<h2>&nbsp;</h2>
									<div className="addImg"><img src="https://s19.postimg.org/xtlwwtdub/noun_573215.png" /></div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<div className="container-narrow">
							<div className="grid-container">
								<div className="lg-6-x-12">
									
									<div className="addImg"><img src="https://s19.postimg.org/zb7d8dikz/noun_530552.png" /></div>
								</div>
								<div id="add-section" className="lg-6-x-12">
									<h2>Organize your list</h2>
									<p className="alt-font">
										Oragnize your prayers in one place.
										Access them prayers easily. 
									</p>
								</div>
								
							</div>
						</div>
					</section>

					<section>
						<div className="container-narrow">
							<div className="grid-container">
								<div id="add-section" className="lg-6-x-12">
									<h2>Share your list</h2>
									<p className="alt-font">Send your list to everyone. Sharing is caring.
										Let them know you are praying.
										Show some love.
									</p>
								</div>
								<div className="lg-6-x-12">
									<h2>&nbsp;</h2>
									<div className="addImg"></div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<div className="container-narrow">
							<div className="grid-container">
								<div className="lg-6-x-12">
									<h2>&nbsp;</h2>
									<div className="addImg"></div>
								</div>
								<div id="add-section" className="lg-6-x-12">
									<h2>Pray with your list</h2>
									<p className="alt-font">Pray with your list 24/7. 
									Set a reminder so you can actually pray when you promise.
									</p>
								</div>
								
							</div>
						</div>
					</section>
					
					<section>
						<div className="container-narrow">
							<div className="grid-container">
								<div id="add-section" className="lg-6-x-12">
									<h2>Track your list</h2>
									<p className="alt-font"> Check off your list when answered. 
										You can know if it works when you track.
									</p>
								</div>
								<div className="lg-6-x-12">
									<h2>&nbsp;</h2>
									<div className="addImg"></div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)
	}		
})

export default Home