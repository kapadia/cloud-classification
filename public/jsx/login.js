
/** @jsx React.DOM */
var LoginComponent = React.createClass({
  render: function() {
      var classString = "icon levels button";
      
      return <div><p><a className={classString} href="/auth/github">Login with GitHub</a></p></div>;
  }
});