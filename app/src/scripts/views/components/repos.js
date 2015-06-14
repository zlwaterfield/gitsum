var React = require('react'),
    UserActions = require('./user-actions'),
    Commits = require('./commits');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      showCommits: false
    }
  },
  handleLinkClick: function(repo) {
    var url = repo.clone_url;
    window.open(url);
  },
  render: function() {
    return (
      <div className="repos">
        <ul>
          { this.props.repos.map(function(repo, index){
            return (
              <li className="row" key={index} onClick={this.handleLinkClick.bind(this, repo)}>
                <div className="row">
                  <div className="col-xs-10">
                    <h1>{repo.name}</h1>
                  </div>
                  <div className="col-xs-2">
                    <span >{ repo.fork ? <span className="forkbutton">Fork</span> : null}</span>
                  </div>
                </div>
                <div>
                  <p>{repo.description}</p>
                </div>
              </li>
            )
          }.bind(this))}
        </ul>

      </div>
    )
  }
});

//handleClick: function(repo) {
//  if(this.state.showCommits === false) {
//    var url = repo.commits_url;
//    var ind = url.indexOf('{');
//    var url_commits = url.substring(0, ind);
//    UserActions.getCommits(url_commits);
//  }
//  this.setState({
//    showCommits: !this.state.showCommits
//  }, function () {
//    //if(repo.name = ) {
//    this.refs.showCommits.animate();
//    //}
//  }.bind(this));
//},

//<div className="row">
//  <div className="col-md-3">
//    <button onClick={this.handleClick.bind(this, repo)}>Commits</button>
//  </div>
//</div>
//<div className="row commits">
//  <div className="col-md-2-offset col-md-8">
//    {this.state.showCommits ? <Commits commits={this.props.commits} /> : null }
//  </div>
//  </div>
