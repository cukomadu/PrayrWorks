import Backbone from 'backbone'
import _ from 'underscore'
import { PrayrCollection } from './models/models'

const PRAYR_STORE = _.extend(Backbone.Events, {

	data: {
		prayrCollection: new PrayrCollection(),
		currentView: 'allpryrstome',
		pDisplay: 'none',
		buttonState: '+'
	},

	_emitChange: function(){
		this.trigger('updatePrayrList')
	},

	_getData: function(){ //state lives here
		return _.clone(this.data)
	},

	_set: function(key, value){
		if(this.data[key] === undefined){
			throw new Error('Key has no value assigned to it')
		}
			this.data[key] = value
			this._emitChange()
	},

	initialize: function(){
		this.data.prayrCollection.on('sync update', this._emitChange.bind(this))
	}
})

PRAYR_STORE.initialize()

export default PRAYR_STORE
