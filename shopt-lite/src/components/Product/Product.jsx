import React from 'react';
import './Product.css';
import axios from 'axios';

function Product({products}) {
    const [user, setUser] = React.useState({});

    const product = products.filter(item => {
        return 'http://localhost:3000/product/' + item._id === window.location.href;
    });

    React.useEffect(() => {
        async function fetch() {
            const {data} = await axios.get('/profile/api/user');

            setUser(data);
        }

        fetch();
    }, []);

    return (
        <div className="product">
            <div className="container">
                {user
                    ?
                    product.map(item => {
                        return (
                            <form key={item._id} className="product__form" action={"/product/add/bag/"+user._id} method="POST">
                                <input type="hidden" name="img" value={item.img} />
                                <div className="product-img" style={{backgroundImage: 'url('+item.img+')'}} name="img"></div>
                                
                                <div className="product__info">
                                    <input type="hidden" name="name" value={item.name} />
                                    <h1 className="product-name">{item.name}</h1>
                                    <input type="hidden" name="description" value={item.description} />
                                    <p className="product-description">{item.description}</p>
                                    <div className="product__block-price">
                                        <input type="hidden" name="price" value={item.price} />
                                        <span className="product-price"><strong>{item.price}</strong>$</span>

                                        <input type="hidden" name="id" value={item._id} />
                                        <input className="product-add-card-btn" type="submit" value="Добавить в корзину" />
                                    </div>
                                </div>
                            </form>
                        )
                    })
                    :
                    product.map(item => {
                        return (
                            <form key={item._id} className="product__form" action="/auth" method="GET">
                                <div className="product-img" style={{backgroundImage: 'url('+item.img+')'}} name="img"></div>
                                        
                                <div className="product__info">
                                    <h1 className="product-name">{item.name}</h1>
                                    <p className="product-description">{item.description}</p>
                                    <div className="product__block-price">
                                        <span className="product-price"><strong>{item.price}</strong>$</span>
                                        <input className="product-add-card-btn" type="submit" value="Добавить в корзину" />
                                    </div>
                                </div>
                            </form>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Product;
