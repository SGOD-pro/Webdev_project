const logout = () => {
    axios.post("/users/logout")
        .then(() => {
            window.location.href = "/";
        }).catch((error) => {
            ShowToast(error.response.data, "danger")
        })
}
