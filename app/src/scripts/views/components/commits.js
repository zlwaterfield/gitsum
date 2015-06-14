var React = require('react');

module.exports = React.createClass({
  render: function() {
    console.log(this.props.commits);
    return (
      <div className="commits">
        <ul className="commitslist">
          { this.props.commits.map(function (commit, index) {
            return (
              <li className="row" key={index}>
                <div className="col-md-10 col-md-offset-1">
                  <h1>{commit.author.login}</h1>
                </div>
              </li>
            )
          })
          }
          </ul>
      </div>
    )
  }
});
