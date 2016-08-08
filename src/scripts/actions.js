import { User, PrayrModel, PrayrCollection } from './models/models'
import PRAYR_STORE from './prayrStore'
import toastr from 'toastr'


const ACTIONS = {

	signUserUp: function(userObj){
		User.register(userObj).then( () => ACTIONS.signUserIn(userObj.email, userObj.password),
            (error) => {
                toastr.error('SignUp Unsuccessful')
                console.log(error)
            }
        )
	},

	signUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
               toastr.success(`User ${email} Signed In Successfully!`)
                console.log(responseData)
                location.hash = 'prayrs/inbox' 
            },
            (error) => {
                toastr.error('SignIn Unsuccessful')
               console.log(error)
            }
        )
    },

    signUserOut: function() { 
        User.logout().then(
            () => {
            	toastr.success(`User ${email} Signed Out Successfully!`)
            	location.hash = 'home'
            }
        )
    },

    savePrayrModel: function(prayrObj){
    	var newPrayr = new PrayrModel(prayrObj)
        newPrayr.save().then(
            (responseData) => { 
                //console.log(responseData)
               toastr.success('Prayr Added Successfully!')
        		location.hash = 'prayrs/add'    
            },
            (error) => {
                //toastr.error('Prayr did not save successfully!')
                //console.log(error)
            }
        )
    },

    updatePrayrModel: function(modelId){
        let PrayrUpdate = PRAYR_STORE.data.prayrCollection.get(modelId)
         
            PrayrUpdate.set({
                answered: PrayrUpdate.get('answered') ? false : true,
                answeredStatus: PrayrUpdate.get('answeredStatus') ? false : true
            })
            PrayrUpdate.save().then((responseData) => {
                //console.log(responseData)
                toastr.success('Prayr Updated Successfully')    
                },
                
                (error) => {
                  //  toastr.error('Pryr Update Unsuccessful')
                    //console.log(error)
                }   
            )

            PRYR_STORE.data.prayrCollection.trigger('update')
    },

    updateViewedStatus: function(modelId){
        let prayrViewedStatus = PRAYR_STORE.data.prayrCollection.get(modelId)

            prayrViewedStatus.set({
                viewStatus: true
            })

            prayrViewedStatus.save().then((responseData) => {
                //console.log(responseData)
               // toastr.success('Prayr ViewStatus Updated Successfully')    
                },
                
                (error) => {
                   // toastr.error('prayr ViewStatus update not successfully')
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
        PRAYR_STORE.data.prayrCollection.fetch({
            data: queryObj
        })
    },

    updateCurrentView: function(clickedView){
       PRAYR_STORE._set('currentView', clickedView)
    },

    deletePrayrModel: function(modelId){
        let prayrModel = PRAYR_STORE.data.prayrCollection.get(modelId)
        prayrModel.destroy()
    }
}

export default ACTIONS
