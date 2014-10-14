
/** @jsx React.DOM */
var ClassificationComponent = React.createClass({displayName: 'ClassificationComponent',
    
    render: function() {
        var rowClassString = "row center";
        var imagesClassString = "col12 pad1 fill-white prose";
        var imageClassString = "col6 pad1";
        var buttonGroupContainerClassString = "col12 pad2 clearfix";
        var buttonGroupClassString = "pill";
        var buttonClassString = "button stroke classification";
        
        return React.DOM.div(null, 
            React.DOM.div({className: rowClassString}, 
                React.DOM.div({className: imagesClassString}, 
                      React.DOM.div({className: imageClassString}, 
                          React.DOM.h4(null, "Subimage"), 
                          React.DOM.canvas({id: "subimg"})
                      ), 
  
                      React.DOM.div({className: imageClassString}, 
                          React.DOM.h4(null, "Patch"), 
                          React.DOM.canvas({id: "patimg"})
                      )
                  )
              ), 
              
              React.DOM.div({className: rowClassString}, 
                  React.DOM.div({className: buttonGroupContainerClassString}, 
                    React.DOM.div({className: buttonGroupClassString}, React.DOM.a({href: "#", className: buttonClassString, 'data-value': "1"}, "Cloudy"), React.DOM.a({href: "#", className: buttonClassString, 'data-value': "0"}, "Not Cloudy"), React.DOM.a({href: "#", className: buttonClassString, 'data-value': "2"}, "Not Sure"), React.DOM.a({href: "#", className: buttonClassString, 'data-value': "3"}, "No Data"))
                  )
              )
          );
  }
});