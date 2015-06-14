var Tabs = React.createClass({
  mixins: [UserStore.mixin],
  getInitialState: function() {
    return {
      repos: this.props.repos,
      tabs: [
        {title: 'first', content: 'Content 1'},
        {title: 'second', content: ''}
      ],
      active: 0
    };
  },
  storeDidChange: function() {
    this.setState(
      loadUser()
    );
  },
  render: function() {
    return <div>
      <TabsSwitcher items={this.state.tabs} active={this.state.active} onTabClick={this.handleTabClick}/>
      <TabsContent items={this.state.tabs} active={this.state.active} repos={this.state.repos}/>
    </div>;
  },
  handleTabClick: function(index) {
    this.setState({active: index})
  }
});

var TabsSwitcher = React.createClass({
  render: function() {
    var active = this.props.active;
    var items = this.props.items.map(function(item, index) {
      return <a href="#" className={'tab ' + (active === index ? 'tab_selected' : '')} onClick={this.onClick.bind(this, index)}>
        {item.title}
      </a>;
    }.bind(this));
    return <div>{items}</div>;
  },
  onClick: function(index) {
    this.props.onTabClick(index);
  }
});

var TabsContent = React.createClass({
  getInitialState: function() {
    return {
      repos: this.props.repos
    }
  },
  render: function() {
    var active = this.props.active;
    var items = this.props.items.map(function(item, index) {
      return <div className={'tabs-panel ' + (active === index ? 'tabs-panel_selected' : '')}>{item.content}</div>;
    });
    return <div>{items}</div>;
  }
});
