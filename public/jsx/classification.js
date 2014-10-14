
/** @jsx React.DOM */
var ClassificationComponent = React.createClass({
    
    render: function() {
        var rowClassString = "row center";
        var imagesClassString = "col12 pad1 fill-white prose";
        var imageClassString = "col6 pad1";
        var buttonGroupContainerClassString = "col12 pad2 clearfix";
        var buttonGroupClassString = "pill";
        var buttonClassString = "button stroke classification";
        
        return <div>
            <div className={rowClassString}>
                <div className={imagesClassString}>
                      <div className={imageClassString}>
                          <h4>Subimage</h4>
                          <canvas id="subimg"></canvas>
                      </div>
  
                      <div className={imageClassString}>
                          <h4>Patch</h4>
                          <canvas id="patimg"></canvas>
                      </div>
                  </div>
              </div>
              
              <div className={rowClassString}>
                  <div className={buttonGroupContainerClassString}>
                    <div className={buttonGroupClassString}><a href='#' className={buttonClassString} data-value="1">Cloudy</a><a href='#' className={buttonClassString} data-value="0">Not Cloudy</a><a href='#' className={buttonClassString} data-value="2">Not Sure</a><a href='#' className={buttonClassString} data-value="3">No Data</a></div>
                  </div>
              </div>
          </div>;
  }
});