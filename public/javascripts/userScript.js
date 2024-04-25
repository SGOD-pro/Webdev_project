// const logout = () => {
//     axios.post("/users/logout")
//         .then(() => {
//             window.location.href = "/";
//         }).catch((error) => {
//             console.log(error.response.data);
//             ShowToast("Not verified", "danger")
//         })
// }

function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const doctorId = localStorage.getItem("id")
    if (!doctorId) {
        alert("Doctor not found.")
    }
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    console.log(jsonData);
    const data = { ...jsonData, doctorId }
    const btn = document.getElementById("submit-btn")
    btn.innerHTML = "Booking..<div class='spinner-grow text-secondary' role='status'></div>"
    btn.setAttribute("disabled", true)
    axios.post("/user/newappointment", data)
        .then(response => {
            window.location = "/users/therapist"
            //localStorage.clear()
        }).catch(error => {
            alert(error.message)
        })

        .finally(() => {
            btn.removeAttribute("disabled")
            btn.innerHTML = "Book"
        })
}


const book = (event) => {
    console.log("book triggered");
    document.querySelector(".app-form").classList.remove("invisible")
    const name = event.target.getAttribute('data-name')
    const image = event.target.getAttribute('data-image')
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
        if(button) {
            button.click()
        }
    }
}