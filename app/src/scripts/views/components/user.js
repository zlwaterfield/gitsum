var React = require('react');
    UserActions = require('./user-actions'),
    Repos = require('./repos');

module.exports = React.createClass({
  getUser: function(){
    UserActions.getUser(this.refs.inv.getDOMNode().value);
    this.refs.inv.getDOMNode().value = "";
    $('.user-form').addClass('animated fadeOutUp');
    $('.github-app').css('margin-top', '50px');
  },
  render: function() {
    return (
      <div className="github-app container">
        <div className="user-form">
          <input type="text" ref="inv"/>
          <button className="btn btn-primary" onClick={this.getUser}>Get User</button>
        </div>
        <div className="users">
          { this.props.user.map(function(user, index){
            return (
              <div key={index}>
                <div>Name: {user.name}</div>
                <img src={user.avatar_url}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
});
