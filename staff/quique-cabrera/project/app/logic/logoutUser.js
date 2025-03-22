const logoutUser = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

export default logoutUser;