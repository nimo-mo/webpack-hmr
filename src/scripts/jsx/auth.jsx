var React = require('react');

var Auth = React.createClass({

	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	componentDidMount: function() {
		var self = this;
		Loading.start();
		setTimeout(function () {
			Api.post('auth',{
				code: Util.getQueryString('code')
			})
			.done(function (res) {
				// accessed
				var data = res.data;
	      $.fn.cookie('X-User-Token',data.token);
	      self.context.router.push('/courses');
			})
			.fail(function (error) {
				// body...
			})
		},3000)
	},

	render: function() {
		return (
			<div />
		);
	}

});

module.exports = Auth;