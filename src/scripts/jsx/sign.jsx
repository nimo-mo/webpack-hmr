var React = require('react');

var Sign = React.createClass({

	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
  	return {
  		current: ''
  	};
  },

  componentDidMount: function() {
  	this.setState({current:this.props.routeParams.type});
  },

  componentDidUpdate: function(prevProps, prevState) {
  	var oldType = prevProps.routeParams.type;
  	var newType = this.props.routeParams.type;
  	if (newType != oldType) {
  		this.setState({current:newType});
  	}
  },

  componentWillReceiveProps: function(nextProps) {
  	
  },

  renderSignIn: function () {
  	return (
  		<div>sign in</div>
		)
  },

  renderSignUp: function () {
  	return (
  		<div>sign up</div>
		)
  },

	render: function() {
		var self = this;
		var props = self.props;
		var state = self.state;
		var current = state.current;
		return (
			<div>
				{current === 'in' && self.renderSignIn()}
				{current === 'up' && self.renderSignUp()}
			</div>
		);
	}

});

module.exports = Sign;