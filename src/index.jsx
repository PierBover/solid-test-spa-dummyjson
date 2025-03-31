import {Route, Router} from "@solidjs/router";
import {render} from 'solid-js/web';
import Home from './Home';
import './index.css';

render(
	() => (
		<Router>
			<Route path="/" component={Home} />
		</Router>
	),
	document.getElementById('root')
);
