import React from 'react';
import './Auth.css';

function Auth() {
    return (
        <div className="auth">
            <form className="auth__register" action="/auth/register" method="POST">
                <label htmlFor="name">Ваше имя:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">Ваша почта:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Ваш пароль:</label>
                <input type="password" id="password" name="password" />

                <button className="auth-submit" type="submit">
                    Зарегистрироваться
                </button>
            </form>

            <span className="auth-or">Если есть аккаунт:</span>

            <form className="auth__login" action="/auth/login" method="POST">
                <label htmlFor="email_login">Ваша почта:</label>
                <input type="email" id="email_login" name="email" />

                <label htmlFor="password_login">Ваш пароль:</label>
                <input type="password" id="password_login" name="password" />

                <button className="auth-submit" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Auth;
