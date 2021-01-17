export const signIn = (user) => {
    return {
        type: 'SIGN_IN',
        payload: user
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}