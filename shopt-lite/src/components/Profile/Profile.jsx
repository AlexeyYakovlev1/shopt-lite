import React from 'react';
import './Profile.css';
import axios from 'axios';

function Profile({profile}) {
	const [user, setUser] = React.useState({});

	React.useEffect(() => {
        async function fetch() {
            const {data} = await axios.get('/profile/api/user');
              
            setUser(data);
        }

        fetch();
    }, []);

    return (
        <div className="profile">
        	<div className="profile__container container">
				<h1>Ваше имя: {profile.name}</h1>
	            <small>Ваша почта: {profile.email}</small>

	            <a className="profile-bag" href={"/bag/"+user._id}>Перейти к корзине</a>
        	</div>
        </div>
    )
}

export default Profile;
