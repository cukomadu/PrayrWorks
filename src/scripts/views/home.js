import React from 'react'
import PreHeader from './preHeader'

const Home = React.createClass({

	render: function(){
		return(
				<div>
					<PreHeader />
					<div className="container-hero">
						<header className="hero">
							<div className="container-narrow">  
							     <h2 className="title">The simplest way to organize, share and track your prayers.</h2>
							     <h4 className="subtitle">Let them know you are praying - show some love</h4>
							 	 <a href="#signUp" className="btn primary md">Create Free Account</a>
							</div>
						</header>
					</div>
					<section>
						<div className="container-narrow">
							<div className="grid-container">
								<div id="add-section" className="lg-6-x-12">
									<h2>Add to your list</h2>
									<p className="alt-font">Create a prayer.
										Add as many to your list.
										A prayer can be anything you want it to be.
										Save your prayer and access it wherever you go, forever.
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
									<h2>Organize your list</h2>
									<p className="alt-font">Edit your list.
										Add a tag to your prayer.
										You can have unlimited tags.
										Access you prayers easily. 
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