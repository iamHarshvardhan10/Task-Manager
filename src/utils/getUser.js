



export const userAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken') !== 'undefined' ? JSON.parse(localStorage.getItem('accessToken')) : localStorage.clear()

    return accessToken
}

export const fetchUser = () => {
    const userInfo = localStorage.getItem('usersInfo') !== 'undefined' ? JSON.parse(localStorage.getItem('usersInfo')) : localStorage.clear()

    return userInfo
}



