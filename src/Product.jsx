import {useParams} from '@solidjs/router';
import {createResource} from 'solid-js';

export default function Product() {
	const params = useParams();
	const [product] = createResource(() => fetch(`https://dummyjson.com/products/${params.id}`).then(res => res.json()));

	return (
		<>
			<h1>Product {params.id}</h1>
			{product.loading && <p>Loading...</p>}
			{product() && (
				<div>
					<h2>{product().title}</h2>
					<p>{product().description}</p>
					<p>Price: ${product().price}</p>
				</div>
			)}
		</>
	);
}