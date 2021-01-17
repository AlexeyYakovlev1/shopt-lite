import React from 'react';
import './Bag.css';
import axios from 'axios';

function Bag() {
	const [bag, setBug] = React.useState([]);

	React.useEffect(() => {
		async function fetch() {
			const {data} = await axios.get('/product/api/bag');

			setBug(data);
		}

		fetch();
	}, [bag])

	return (
		<div className="bag">
			<div className="bag__container container">
				{bag.length
					?
					bag.map((item, index) => {
						return (
							<div key={`${item.name}_${index}`} className="bag-product">
								<a href={"/product/"+item._id}>
									<div className="bag-img" style={{backgroundImage: "url("+item.img+")"}}></div>
								</a>
								<div className="bag-info">
									<h1 className="bag-name">{item.name}</h1>
									<span className="bag-price"><strong>{item.price}</strong>$</span>
									<form className="bag-delete-form" action={"/product/delete/"+item._id} method="POST">
										<input className="bag-delete-input" type="submit" value="Удалить" />
									</form>
									<form className="bag-buy-form" action={"/product/buy/"+item._id} method="POST">
										<input className="bag-buy-input" type="submit" value="Купить" />
									</form>
								</div>
							</div>
						)
					})
					:
					<>
						<p className="bag-nothing">Корзина пуста</p>
						<a className="bag-to-shop" href="/">Посмотреть товары</a>
					</>
				}
			</div>
		</div>
	)
}

export default Bag;