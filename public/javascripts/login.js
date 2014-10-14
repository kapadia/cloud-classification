
/** @jsx React.DOM */
var LoginComponent = React.createClass({displayName: 'LoginComponent',
  render: function() {
      var classString = "icon github button";
      return React.DOM.div(null, React.DOM.p(null, React.DOM.a({className: classString, href: "/auth/github"}, "Login with GitHub")));
  }
});