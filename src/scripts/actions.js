import { User, PrayrModel,  PrayrCollection, PersonalPrayrModel, PersonalPrayrCollection} from './models/models'
import PRAYR_STORE from './prayrStore'
import toastr from 'toastr'


const ACTIONS = {

    routeTo: function(route){
        location.hash = route
    },

	signUserUp: function(userObj){
		User.register(userObj).then( () => ACTIONS.signUserIn(userObj.email, userObj.password, 'prayrs/compose'),
            (error) => {
               toastr.error('SignUp Unsuccessful')
                console.log(error)
            }
        )
	},

	signUserIn: function(email, password, sendUserTo) {
        User.login(email, password).then(
            (responseData) => {
               toastr.success(`User ${User.getCurrentUser().name} Signed In Successfully!`)
                console.log('successful signin!', responseData)
                //location.hash = 'prayrs/compose' 
                ACTIONS.routeTo(sendUserTo)
            },
            (error) => {
                toastr.error('SignIn Unsuccessful')
               console.log(error)
            }
        )
    },

    signUserOut: function(name) { 
        User.logout().then(
            () => {
            	toastr.success(`User ${name} Signed Out Successfully!`)
            	location.hash = 'home'
            }
        )
    },

    savePrayrModel: function(prayrObj){
    	var newPrayr = new PrayrModel(prayrObj)
        newPrayr.save().then(
            (responseData) => { 
                console.log(responseData)
               toastr.success('Prayer Sent Successfully!')
        		location.hash = 'prayrs/sent'    
            },
            (error) => {
                toastr.error('Prayr did not save successfully!')
                console.log(error)
            }
        )
    },

    savePersonalPrayrModel: function(prayrObj){
        var newPersonalPrayr = new PersonalPrayrModel(prayrObj)
        var personalPrayrCollectionCopy = new PersonalPrayrCollection( PRAYR_STORE.data.personalPrayrCollection.toJSON() )


        newPersonalPrayr.save().then(
            (responseData) => { 
                toastr.success('Personal Prayr saved!')

                personalPrayrCollectionCopy.add(newPersonalPrayr)
                PRAYR_STORE._set( 'personalPrayrCollection', personalPrayrCollectionCopy )
                    
            },
            (error) => {
                toastr.error('Prayr did not save successfully!')
                console.log(error)
            }
        )
    },

    updatePrayrModel: function(modelId){
        let prayrCollectionCopy = new PrayrCollection( PRAYR_STORE.data.prayrCollection.toJSON() )

        let prayrModelUpdate = PRAYR_STORE.data.prayrCollection.get(modelId)
         
            prayrModelUpdate.set({
                answered: prayrModelUpdate.get('answered') ? false : true,
                answeredStatus: prayrModelUpdate.get('answeredStatus') ? false : true
            })
            
            prayrModelUpdate.save().then((responseData) => {
                console.log(responseData)
                toastr.success('Prayr Updated Successfully')
                prayrCollectionCopy.set(prayrModelUpdate)
                PRAYR_STORE._set( 'prayrCollection', prayrCollectionCopy )    
                },               
                
                (error) => {
                   toastr.error('Pryr Update Unsuccessful')
                    //console.log(error)
                }   
            )

    },

    updatePersonalPrayrModel: function(modelId){
        let personalPrayrCollectionCopy = new PersonalPrayrCollection( PRAYR_STORE.data.personalPrayrCollection.toJSON() )

        let personalPrayrModel = PRAYR_STORE.data.personalPrayrCollection.get(modelId)
           // personalPrayrCollectionCopy.remove(personalPrayrModel)
            personalPrayrModel.set({
                answered: personalPrayrModel.get('answered') ? false : true
            })
            
            personalPrayrModel.save().then((responseData) => {
                console.log(responseData)
                toastr.success('PersonalPrayr Updated Successfully')
                console.log('this is copy coll', personalPrayrCollectionCopy)
                personalPrayrCollectionCopy.set(personalPrayrModel, {
                    remove: false
                })
                PRAYR_STORE._set( 'personalPrayrCollection', personalPrayrCollectionCopy )    
                },               
                
                (error) => {
                   toastr.error('Pryr Update Unsuccessful')
                    //console.log(error)
                }   
            )
    },

    updateViewedStatus: function(modelId){
        let prayrViewedStatus = PRAYR_STORE.data.prayrCollection.get(modelId)

            prayrViewedStatus.set({
                viewStatus: true
            })

            prayrViewedStatus.save().then((responseData) => {
                //console.log(responseData)
                toastr.success('Prayr ViewStatus Updated Successfully')    
                },
                
                (error) => {
                    toastr.error('prayr ViewStatus update not successfully')
                    //console.log(error)
                }   
            )
        
        PRAYR_STORE.data.prayrCollection.trigger('update')
    
    },

    updateStateProps: function(buttonState, pDisplay){
        if(pDisplay === 'none'){
            PRAYR_STORE._set('pDisplay', 'block')
            PRAYR_STORE._set('buttonState', '-')
        } 
        else {
            PRAYR_STORE._set('pDisplay', 'none')
            PRAYR_STORE._set('buttonState', '+')
        }
    },
             
    fetchPrayrsByQuery: function(queryObj){
        let prayrCollection = new PrayrCollection()
        prayrCollection.fetch({
            data: queryObj
        }).then( ()=> {
              PRAYR_STORE._set('prayrCollection', prayrCollection )
        })
    },

    fetchPersonalPrayrs: function(queryObj){
        let personalPrayrCollection = new PersonalPrayrCollection()
        personalPrayrCollection.fetch({
            data: queryObj
        }).then( ()=> {
              PRAYR_STORE._set('personalPrayrCollection', personalPrayrCollection )
        })
    },

    updateCurrentView: function(clickedView){
       PRAYR_STORE._set('currentView', clickedView)
    },



    deletePrayrModel: function(modelId){
        let prayrCollectionCopy = new PrayrCollection( PRAYR_STORE.data.prayrCollection.toJSON() )
        let prayrModel = prayrCollectionCopy.get(modelId)

        prayrModel.destroy().then(()=>{
            prayrCollectionCopy.remove(prayrModel)
            PRAYR_STORE._set('prayrCollection', prayrCollectionCopy )

        })
    },

    deletePersonalPrayrModel: function(modelId){
        let personalPrayrCollectionCopy = new PersonalPrayrCollection( PRAYR_STORE.data.personalPrayrCollection.toJSON() )
        let personalPrayrModel = personalPrayrCollectionCopy.get(modelId)

        personalPrayrModel.destroy().then(()=>{
            console.log('prayr deleted!!')
            personalPrayrCollectionCopy.remove(personalPrayrModel)
            PRAYR_STORE._set('personalPrayrCollection', personalPrayrCollectionCopy )

        })
    },

    sharePrayr: function(userObj){
        console.log(userObj)
        var newPrayr = new PrayrModel(userObj)
        newPrayr.save().then(
            (responseData) => { 
                console.log(responseData)
              toastr.success('Prayr Added Successfully!')
                location.hash = 'prayrs/shares'    
            },
            (error) => {
               toastr.error('Prayr did not save successfully!')
                console.log(error)
            }
        )
        PRAYR_STORE.data.prayrCollection.add(newPrayr)
    }
}

export default ACTIONS
