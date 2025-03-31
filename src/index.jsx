import {Route, Router} from "@solidjs/router";
import {ErrorBoundary, render} from 'solid-js/web';
import Home from './Home';
import Login from './Login';
import Me from './Me';
import Product from './Product';
import './index.css';

function RedirectToLogin() {
	window.location.href = '/login';
}

render(
	() => (
		<ErrorBoundary fallback={<RedirectToLogin />}>
			<Router preload={false}>
				<Route path="/" component={Home} />
				<Route path="/products/:id" component={Product} />
				<Route path="/login" component={Login} />
				<Route path="/me" component={Me} preload={async () => {
					const response = await fetch('https://dummyjson.com/auth/me?delay=1000', {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
						}
					});

					if (!response.ok) {
						throw new NotAuthentincatedError();
					}

					const json = await response.json();

					console.log(json);

					return json;
				}}/>
			</Router>
		</ErrorBoundary>
	),
	document.getElementById('root')
);
