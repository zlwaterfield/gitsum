var React = require('react');

module.exports = React.createClass({
  handleLinkClick: function(starred) {
    var url = starred.html_url;
    window.open(url);
  },
  render: function() {
    return (
      <div className="repos">
        <ul>
          { this.props.starred.map(function(starred, index){
            return (
              <li className="row" key={index} onClick={this.handleLinkClick.bind(this, starred)}>
                <div className="col-md-10 col-md-offset-1">
                  <h1>{starred.name}</h1>
                </div>
              </li>
            )
          }.bind(this))}
        </ul>

      </div>
    )
  }
});
