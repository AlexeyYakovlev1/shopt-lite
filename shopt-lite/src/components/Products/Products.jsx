import React from 'react';
import './Products.css';
import axios from 'axios';

function Products() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        async function renderProducts() {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        }

        renderProducts();
    }, []);

    return (
        <div className="products">
            {products.length
                ?
                <ul className="products__list">
                    {products.map(product => {
                        return (
                            <a key={product._id} href={"/product/"+product._id}>
                                <li>
                                    <div className="products-img" style={{backgroundImage: 'url('+product.img+')'}}></div>
                                    <div className="products__info">
                                        <h2 className="products-name">{product.name}</h2>
                                        <p className="products-description">{product.description}</p>
                                        <span className="products-price"><strong>{product.price}</strong>$</span>
                                    </div>
                                </li>
                            </a>
                        )
                    })}
                </ul>
                :
                <span className="products-nothing">
                    No products :(
                </span>
            }
        </div>
    )
}

export default Products;