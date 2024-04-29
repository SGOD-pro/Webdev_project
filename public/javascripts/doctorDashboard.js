const addTipsForm = () => {
    document.getElementById("add-tips-card").classList.remove("invisible")
}
const closeTipsBtn = () => {
    document.getElementById("add-tips-card").classList.add("invisible")
}
const addTips = () => {
    var tips = document.getElementById("tips")
    console.log(tips.value);
    const data = { tips: tips.value }
    console.log(data);
    axios.post("/doctor/addTips", data)
        .then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            ShowToast(error.response.data, "danger")
        })
}

const emergency = () => {
    const req = confirm("Are you sure?")
    if (req) {
        axios.get("/doctor/emergency")
            .then(response => {
                if (response) {
                    window.location.reload();
                }
            }).catch(error => {
                ShowToast(error.response.data, "danger")
            })
    }
}
