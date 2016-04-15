var React = require('react');
import { Link } from 'react-router';

var RouterDemo = React.createClass({

	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	render: function() {
		var self = this;
		var state = self.state;
		return (
			<div role="router-demo">
				<h1>router demo</h1>
				<ul>
					<li><Link to={{ pathname:'/demo' }}>/demo</Link></li>
					<li><Link to={{ pathname:'/sign/in' }}>/sign/in</Link></li>
					<li><Link to={{ pathname:'/sign/up' }}>/sign/up</Link></li>
					<li><Link to={{ pathname:'/sign/up', query:{ q:1, k:2 } }}>/sign/up/with/query</Link></li>
				</ul>
			</div>
		);
	}

});

module.exports = RouterDemo;