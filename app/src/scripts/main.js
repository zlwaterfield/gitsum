var React = require('react'),
	  Router = require('react-router'),
    McFly = require('mcFly'),
    Flux  = new McFly();

/* Components */
var Header = require('./views/components/header'),
    Repos = require('./views/components/repos'),
    Followers = require('./views/components/followers'),
    Following = require('./views/components/following'),
    Starred = require('./views/components/starred'),
    User = require('./views/components/user'),
    UserActions = require('./views/components/user-actions'),
    UserList = require('./views/components/userlist');

/** Store */
_currentUser = [];
_userList = [];
_userInfo = [];

var UserStore = Flux.createStore({
  loadUser: function(){
    return _currentUser
  },
  loadUserList: function(){
    return _userList
  },
  loadRepos: function(){
    return _repos
  },
  loadInfo: function () {
    return _userInfo
  },
  getUser: function(user){
    var url_user = 'http://api.github.com/users/' + user;
    $.ajax({
      method: "GET",
      url: url_user
    })
    .done(function( result ) {
      _currentUser.push(result);
      var checkFlag = false;
      for(var i = 0; i<_userList.length; i++) {
        if(_userList[i].login == user) {
          checkFlag= true;
        }
      }
      if(checkFlag == false ){
        _userList.push(result);
      }
    })
    .then(function () {
      UserStore.emitChange();
    })
  },
  getInfo: function(user){
    var url_repos = 'http://api.github.com/users/' + user + '/repos';
    var url_followers = 'http://api.github.com/users/' + user + '/followers';
    var url_following = 'http://api.github.com/users/' + user + '/following';
    var url_starred = 'http://api.github.com/users/' + user + '/starred';

    $.ajax({
        method: "GET",
        url: url_repos
      })
      .done(function( result ) {
        _userInfo.repos = result;
        for(var i = 0; i <_userInfo.repos.length; i++) {
          _userInfo.repos[i].commits = [];
        }
      }).then(function () {
        $.ajax({
          method: "GET",
          url: url_followers
        })
        .done(function( result ) {
          _userInfo.followers = result;
        })
        .then(function () {
          $.ajax({
            method: "GET",
            url: url_following
          })
          .done(function( result ) {
            _userInfo.following = result;
          })
          .then(function () {
            $.ajax({
              method: "GET",
              url: url_starred
            })
            .done(function( result ) {
              _userInfo.starred = result;
            })
            .then(function () {
              UserStore.emitChange();

              //for(var i = 0; i <_userInfo.repos.length; i++) {
              //  var url = _userInfo.repos[i].commits_url;
              //  var ind = url.indexOf('{');
              //  var url_commits = url.substring(0, ind);
              //
              //  $.ajax({
              //    method: "GET",
              //    url: url_commits
              //  })
              //    .done(function( result ) {
              //      //_userInfo.repos[i].push(result);
              //    })
              //    .then(function () {
              //      //UserStore.emitChange();
              //    })
              //}
            })
          })
        })
      });
  },
  getCommits: function(url){
    console.log('ere3');

    $.ajax({
      method: "GET",
      url: url
    })
      .done(function( result ) {
        _userInfo.commits = result;
      })
        .then(function () {
          UserStore.emitChange();
        });
  }
}, function(payload){
  if(payload.actionType === "GET_USER") {
    _currentUser = [];
    _userInfo = [];
    UserStore.getUser(payload.text);
    UserStore.getInfo(payload.text);
  } else if(payload.actionType === "GET_COMMITS") {
    console.log('ere');
    _userInfo.commits = [];
    UserStore.getCommits(payload.url);
  }
});

function loadUser(){
  return {
    currentUser: UserStore.loadUser(),
    userList: UserStore.loadUserList(),
    userInfo: UserStore.loadInfo()
  }
}

var GithubApp = React.createClass({
  mixins: [UserStore.mixin],
  getInitialState: function(){
    return loadUser()
  },
  storeDidChange: function() {
    console.log('changed');
    this.setState(loadUser());
    this.setState({
      showButtons: true,
      showSearchHeader: true,
      showHistory: true,
      showRepo: false,
      showFollower:false,
      showFollowing:false,
      showStarred :false
    });
  },
  showRepos: function () {
    this.setState({
      showRepo: true,
      showFollower:false,
      showFollowing:false,
      showStarred :false
    })
  },
  showFollowers: function () {
    this.setState({
      showRepo: false,
      showFollower:true,
      showFollowing:false,
      showStarred :false
    })
  },
  showFollowings: function () {
    this.setState({
      showRepo: false,
      showFollower:false,
      showFollowing:true,
      showStarred :false
    })
  },
  showStarreds: function () {
    this.setState({
      showRepo: false,
      showFollower:false,
      showFollowing:false,
      showStarred :true
    })
  },
  render: function() {
    return (
      <div>
        <Header userlist={this.state.userList} showSearchHeader={this.state.showSearchHeader} showHistory={this.state.showHistory}/>
        <User user={this.state.currentUser} />
        { this.state.showButtons ? <div className="container">
          <div className="row">
            <div className="col-xs-3 btn-block-main" onClick={this.showRepos}>
              <span>Repos</span>
              <h3> { this.state.userInfo.repos.length }</h3>
            </div>
            <div className="col-xs-3 btn-block-main" onClick={this.showFollowers} >
              <span >Followers</span>
              <h3> { this.state.userInfo.followers.length }</h3>
            </div>
            <div className="col-xs-3 btn-block-main" onClick={this.showFollowings} >
              <span >Following</span>
              <h3> { this.state.userInfo.following.length }</h3>
            </div>
            <div className="col-xs-3 btn-block-main" onClick={this.showStarreds} >
              <span >Starred</span>
              <h3> { this.state.userInfo.starred.length }</h3>
            </div>
          </div>
        </div> : null }
        <div className="container">
          { this.state.showRepo ? <Repos repos={this.state.userInfo.repos} user={this.state.currentUser} commits={this.state.userInfo.commits}/> : null }
          { this.state.showFollower ? <Followers followers={this.state.userInfo.followers}/> : null }
          { this.state.showFollowing ? <Following following={this.state.userInfo.following}/> : null }
          { this.state.showStarred ? <Starred starred={this.state.userInfo.starred}/> : null }
        </div>
      </div>

    )
  }
});

React.render(<GithubApp />, document.getElementById('app-container'));
