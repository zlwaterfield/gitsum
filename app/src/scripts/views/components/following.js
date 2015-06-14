var React = require('react');

module.exports = React.createClass({
  handleLinkClick: function(following) {
    var url = following.html_url;
    window.open(url);
  },
  render: function() {
    console.log(this.props.following);
    return (
      <div className="repos">
        <ul>
          { this.props.following.map(function(following, index){
            return (
              <li className="row" key={index} onClick={this.handleLinkClick.bind(this, following)}>
                <div className="col-xs-2">
                  <img className="foll-img" src={following.avatar_url}/>
                </div>
                <div className="col-xs-10">
                  <h1>{following.login}</h1>
                </div>
              </li>
            )
          }.bind(this))}
        </ul>

      </div>
    )
  }
});

