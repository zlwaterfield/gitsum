var React = require('react');

module.exports = React.createClass({
  handleLinkClick: function(follower) {
    var url = follower.html_url;
    window.open(url);
  },
  render: function() {
    return (
      <div className="repos">
        <ul>
          { this.props.followers.map(function(follower, index){
            return (
              <li className="row" key={index} onClick={this.handleLinkClick.bind(this, follower)}>
                <div className="col-xs-2">
                  <img className="foll-img" src={follower.avatar_url}/>
                </div>
                <div className="col-xs-10">
                  <h1>{follower.login}</h1>
                </div>
              </li>
            )
          }.bind(this))}
        </ul>

      </div>
    )
  }
});

