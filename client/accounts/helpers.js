Template.accounts.helpers({
   'registerClicked':function(){
       return Session.get('registerOpen') || false;
   } ,
   'forgotClicked':function(){
      return Session.get('forgotClicked')|| false;
   },
   'resetToken' : function(){
      return Session.get('reset-token') || false;
   }
});
