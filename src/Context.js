import React from 'react'
export default React.createContext({
    maladies: [],
    remedies: [],
    isLoggedIn: false,
    likes: [],
    myLikes: [],
    handleLogIn:()=>{},
    handleLogout:()=>{},
    handleMyLikes:()=>{}
})