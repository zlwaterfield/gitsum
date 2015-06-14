var React = require('react'),
    McFly = require('mcFly'),
    Flux  = new McFly();

module.exports = Flux.createActions({
  getUser: function(text){
    return {
      actionType: "GET_USER",
      text: text
    }
  },
  getCommits: function(url){
    console.log('ere2');
    return {
      actionType: "GET_COMMITS",
      url: url
    }
  }
});
