const logout = () => {
    axios.get("/admin/logout")
        .then((response) => {
            window.location.href = "/"

        }).catch((error) => {
            alert("Somethig went wrong.")
        })
}