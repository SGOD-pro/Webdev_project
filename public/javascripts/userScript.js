const book = (event) => {
    console.log("book triggered");
    document.querySelector(".app-form").classList.remove("invisible")
    const name = event.target.getAttribute('data-name')
    const image = event.target.getAttribute('data-image')
    if (!localStorage.getItem("id")) {
        const id = event.target.getAttribute('data-id')
        localStorage.setItem("id", id);
    }

    console.log(image);
    document.getElementById("doctor-image").src = image
    document.getElementById("doctor-name").innerHTML = name
}
const hideAppForm = () => {
    document.querySelector(".app-form").classList.add("invisible")
}
window.onload = () => {
    const id = localStorage.getItem("id");
    if (id) {
        var button = document.querySelector(`button[data-id="${id}"]`);
        console.log(button);
        if (button) {
            button.click()
        }
    }
}

document.getElementById("add-app-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const doctorId = localStorage.getItem("id")
    if (!doctorId) {
        ShowToast("Douldnot find doctor.", "warning")
        return;
    }
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    console.log(jsonData);
    const data = { ...jsonData, doctorId }
    const btn = document.getElementById("submit-btn")
    btn.setAttribute("disabled", true)
    localStorage.setItem("data", JSON.stringify(data));
    const check = { date: data.date, time: data.time, doctorId: data.doctorId }
    axios.post('/users/exists', check)
        .then(() => {
            window.location.href = "/users/payment"
        }).catch((error) => {
            if (error.response.status == 500) {
                ShowToast(error.response.data, "danger",)
            }
            else {
                ShowToast(error.response.data, "info")
            }
        })
        .finally(() => {
            btn.removeAttribute("disabled")
        })
})

