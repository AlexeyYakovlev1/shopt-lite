import React from 'react';
import './Header.css';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions/index.js';
import {BrowserRouter, Switch, Route, a} from 'react-router-dom';
import Profile from '../Profile/Profile.jsx';
import {signIn} from '../../redux/actions/index.js';
import Bag from '../Bag/Bag.jsx';
import axios from 'axios';
import Auth from '../Auth/Auth.jsx';
import Product from '../../components/Product/Product';

function Header() {
    const logged = useSelector(state => state.logged);
    const dispatch = useDispatch();

    const [user, setUser] = React.useState({});
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        async function fetch() {
          const {data} = await axios.get('/api/products');

          setProducts(data);
        }

        fetch();
    }, []);

    React.useEffect(() => {
        async function fetch() {
            const {data} = await axios.get('/profile/api/user');

            dispatch(signIn(data));
              
            setUser(data);
        }

        fetch();
    }, [dispatch]);

    async function search() {
        const {data} = await axios.post('/search');
                  
        setProducts(data);
        console.log(products);
    }

    return (
        <>
            <header className="header">
                <div className="header__container container">
                    <a href="/" className="header__block-logo">
                        <div className="header-logo">Shopt</div>
                    </a>
                    <form className="header__search-form" onSubmit={() => search()} action="/search" method="POST">
                        <span>Поиск</span>
                        <input type="text" className="header-search-input" name="q" />
                    </form>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
                            {!logged.length || logged[0] === ""
                                ?
                                <>
                                    <li>
                                        <a href="/auth">Зарегистрироваться</a>
                                    </li>
                                    <li>
                                        <a href="/auth">Корзина</a>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <a href={"/profile/"+logged.map(user => user._id)}>Профиль</a>
                                    </li>
                                    <li>
                                        <a href="/auth/logout" onClick={() => dispatch(logOut())}>Выйти</a>
                                    </li>
                                    <li>
                                        <a href={"/bag/"+logged.map(user => user._id)}>Корзина</a>
                                    </li>
                                </>
                            }
                            
                        </ul>
                    </nav>
                </div>
            </header>

            <BrowserRouter>
                <Switch>
                    <>
                        <Route exact path="/auth" component={Auth} />
                            {products.map(product => {
                                return (
                                    <Route
                                        exact
                                        key={product.name}
                                        path={'/product/'+product._id}
                                    >
                                        <Product products={products} />
                                    </Route>
                                )
                            })}
                            
                            {user
                            ?
                            <>
                              <Route
                                key={user._id}
                                exact
                                path={'/profile/'+user._id}  
                              >
                                <Profile exact profile={user} />
                              </Route>
                              <Route 
                                  exact
                                path={"/bag/"+user._id}
                               >
                                <Bag />
                              </Route>
                             </>
                            :
                            false
                            }
                    </>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Header;
