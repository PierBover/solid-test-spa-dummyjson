import {createResource, For} from 'solid-js';

export async function getProducts () {
	const response = await fetch('https://dummyjson.com/products?delay=1000');
	const json = await response.json();
	return json.products;
}

export default function Home() {
	const [products] = createResource(getProducts);

	return (
		<>
			<h1>Products</h1>
			<ul>
				<For each={products()} fallback={<p>Loading...</p>}>
					{(product) => (
						<li><a href={`/products/${product.id}`}>{product.title}</a></li>
					)}
				</For>
			</ul>
		</>
	);
}