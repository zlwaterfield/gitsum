var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="">
        <div className="userList">
          <span>Search History</span>
          { this.props.userlist.map(function(user, index){
            return (
              <div key={index}>
                <div>Name: {user.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
});
