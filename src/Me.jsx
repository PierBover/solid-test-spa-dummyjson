import {createResource, Show} from 'solid-js';
import {NotAuthentincatedError} from './utils';

async function fetchMe() {
	const response = await fetch('https://dummyjson.com/auth/me', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
		}
	})

	if (!response.ok) {
		throw new NotAuthentincatedError();
	}

	const json = await response.json();
	return json;
}

export default function Me(props) {

	const [me] = createResource(fetchMe);

	return (
		<Show when={me()}>
			<h1>Me</h1>
			{me() && (
				<div>
					<h2>{me().firstName} {me().lastName}</h2>
					<p>Id: {me().id}</p>
					<p>Email: {me().email}</p>
					<p>Username: {me().username}</p>
				</div>
			)}
		</Show>
	);
}