const logout = () => {
    axios.get("/admin/logout")
        .then((response) => {
            window.location.href = "/"

        }).catch((error) => {
            alert("Somethig went wrong.")
        })
}

const addTipsForm = () => {
    document.getElementById("add-tips-card").classList.remove("invisible")
}
const closeTipsBtn = () => {
    document.getElementById("add-tips-card").classList.add("invisible")
}
const addTips = () => {

}

const emergency = () => {
    console.log("hii");
    confirm("Are you sure?")
}