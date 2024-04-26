const addTipsForm = () => {
    document.getElementById("add-tips-card").classList.remove("invisible")
}
const closeTipsBtn = () => {
    document.getElementById("add-tips-card").classList.add("invisible")
}
const addTips = () => {
    var tips = document.getElementsByName("tips")
    console.log(tips);
    const data = { tips }
    axios.post("/doctor/addTips", data)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(error.response.data);
            console.log(error.response.status);
        })
}

const emergency = () => {
    console.log("hii");
    confirm("Are you sure?")
}