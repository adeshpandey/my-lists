UI.registerHelper('getErrors', function() {

    errors = Session.get("errors");
    errorHTML = "";
    
    if(errors){
        for(i=0;i<errors.length;i++){
          errorHTML+="<div class='alert alert-warning'>"+errors[i]+"</div>";  
        }
    }
    
    var success = Session.get('success');
    if(success){
        for (var i = 0; i < success.length; i++) {
            errorHTML+= "<div class='alert alert-success'>"+success[i]+"</div>";
        }
    }
    return errorHTML;
});