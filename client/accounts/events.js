Template.login.events({
    'submit #login-form':function(e,t){
        
          e.preventDefault();
          var email= t.find('input[name=email]').value,
          password = t.find('input[name=password]').value;
          
          errors = [];
          
          if(!email){
              errors.push("Please provide your email.");
          }
          else{
              if(!Meteor.validEmail(email)){
                  errors.push("Please provide a valid email.");
              }
          }
          
          if(!password){
              errors.push("Please provide your password.");
          }
        
          if(errors.length>0){
              
              Session.set("errors",errors);
              return;
          }
    
          Meteor.loginWithPassword(email,password,function(e){
              if(e) {
                  errors.push(e.reason);
                  Session.set("errors",errors);
              }
              
          }); 
    },
    'click #register':function(e,t){
        Session.set('registerOpen',true);
    },
    'click #forgot-pass':function(){
        Session.set('forgotClicked',true);
    }
});
Template.register.events({
    'click #cancel-register' :function(e,t){
        Session.set('registerOpen',false);
    },
    'submit #register-form':function(e,t){
        e.preventDefault();
        var name = t.find('input[name=name]').value,
        email    = t.find('input[name=email]').value,
        password = t.find('input[name=password]').value;
        
        errors = [];
        if(!name){
            errors.push("Please provide your name.");
        }
        if(!email){
            errors.push("Please provide your email.");
        }
        else{
            if(!Meteor.validEmail(email)){
                errors.push("Please provide a valid email.");
            }
        }
        if(!password){
            errors.push("Please select a password.");
        }
        else{
            if(password.length<6){
                errors.push("Your password must be at least 6 charecters long.");
            }
        }
        
        if(errors.length>0){
            Session.set("errors",errors);
            return false;
        }
        
        Accounts.createUser({username:email, email:email, password:password, profile:{name:name}},function(e){
            
            
            if(e){
                errors.push(e.reason);
            } 
        });
        if(errors.length>0){
            Session.set("errors",errors);
            return false;
        }
        Meteor.loginWithPassword(email,password);
    }
});
Template.forgotPass.events({
    'click #cancel-forgot':function(e,t){
        Session.set('forgotClicked',false);
    },
    'click #send-reset-link':function(e,t){
        
        e.preventDefault();
        
        var email = t.find('input[name=email]').value;
        Accounts.forgotPassword({email:email},function(e,m){
            if(e){
                errors = [];
                errors.push(e.reason);
                Session.set('errors',errors);
                return false;
            }
            Session.set("success","A reset link sent to your email.");
        })
    }
});
Template.changePassword.events({
    'submit #change-password-form':function(e,t){
        e.preventDefault();
        var newPassword = t.find('input[name=newpassword]').value;
        token           = Session.get('reset-token');
        
        Accounts.resetPassword(token,newPassword,function(e){
            if(e){
                errors = [];
                errors.push(e.reason);
                Session.set('errors',errors);
                return false;
            }
            Session.set('reset-token',false);
        });
    }
})