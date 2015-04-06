Router.configure({
  layoutTemplate: 'ApplicationLayout',
  notFoundTemplate: 'DataNotFound'
});

var requireLogin = function() {
if (!Meteor.user()) {
this.render('accounts');
} else {
this.next();
}
}
Router.route('/',{"template":"Home",data:{"title":"Home"}});
Router.route('/list/new',{"template":"NewList", name:"list.create"});
Router.route('/accounts',{name:"accounts"});
Router.onBeforeAction(requireLogin, {except : ['home']});
