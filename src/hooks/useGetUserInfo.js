export const useGetUserInfo =()=>{
    const{name,userId,profilePhoto,isAuth,createrdAt}=JSON.parse(localStorage.getItem("auth"))||{};
    return {name,userId,profilePhoto,isAuth};
}