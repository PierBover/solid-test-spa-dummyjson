import {useNavigate} from "@solidjs/router";
import {createSignal} from 'solid-js';
import {bindInput} from './utils';

async function authenticate(username, password) {
	const response = await fetch('https://dummyjson.com/auth/login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({username, password})
	});

	if (!response.ok) throw new Error("Login failed");

	const json = await response.json();

	localStorage.setItem('accessToken', json.accessToken);
	localStorage.setItem('refreshToken', json.refreshToken);
}

export default function Login() {
	const [username, setUsername] = createSignal('emilys');
	const [password, setPassword] = createSignal('emilyspass');
	const navigate = useNavigate();

	async function onSubmit(event) {
		event.preventDefault();
		await authenticate(username(), password());
		navigate('/me');
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<label>
					Username:
					<input type="text" name="username" {...bindInput(username, setUsername)} />
				</label>
				<br />
				<label>
					Password:
					<input type="password" name="password" {...bindInput(password, setPassword)} />
				</label>
				<br />
				<button type="submit">Login</button>
			</form>
		</>
	);
}