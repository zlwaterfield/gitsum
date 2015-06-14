var React = require('react'),
    Select = require('react-select');

module.exports = React.createClass({
  logChange: function (opt, index) {
    UserActions.getUser(opt[index].username);
  },
  getUser: function(){
    UserActions.getUser(this.refs.inv.getDOMNode().value);
    this.refs.inv.getDOMNode().value = "";
  },
  render: function() {
    var options = [];
    for(var i = 0; i <this.props.userlist.length; i++) {
      var name;
      if(this.props.userlist[i].name) {
        name = this.props.userlist[i].name;
      } else {
        name = this.props.userlist[i].login;
      }
      options.push({
        label: name,
        value:i,
        username: this.props.userlist[i].login
      })
    }
    return (
      <div className="page-header-top">
        <div className="row">
          <div className="col-sm-3">
            { this.props.showHistory ? <span>Search History</span> : null }
            { this.props.showHistory ? <Select name='drop-down' options={options} onChange={this.logChange.bind(this, options)} /> : null }
          </div>
          <div className="col-sm-6">
            <h1>gitsum</h1>
          </div>
          <div className="col-sm-3">
            { this.props.showSearchHeader ? <input type="text" ref="inv"/> : null}
            { this.props.showSearchHeader ? <button className="btn btn-primary search-button" onClick={this.getUser}>Search Another User</button> : null }
          </div>
        </div>
      </div>
    );
  }
});
