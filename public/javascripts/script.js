const forms = document.querySelector(".forms")
const userForm = document.querySelector(".forms .student")
const adminForm = document.querySelector(".forms .admin")


const user = () => {
    forms.classList.remove("hidden")
    adminForm.classList.add("hidden")
    userForm.classList.remove("hidden")
}
const admin = () => {
    forms.classList.remove("hidden")
    userForm.classList.add("hidden")
    adminForm.classList.remove("hidden")
}

document.getElementById("form-close").addEventListener("click", () => {
    forms.classList.add("hidden")
    if (!adminForm.classList.contains("hidden")) {
        adminForm.classList.add("hidden")
    }
    if (!userForm.classList.contains("hidden")) {
        userForm.classList.add("hidden")
    }
})
const student = document.querySelector(".forms .student")
const showLogin = () => {
    student.style.transform = "translateX(-0%)"
}
const showSignup = () => {
    student.style.transform = "translateX(-100%)"
}
const signupForm = document.getElementById('userSignup');

signupForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataJSON = {};
    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    console.log("kii");
    if (!formDataJSON.fullname.trim()) {
        alert("Please enter your fullname.");
        return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formDataJSON.phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(formDataJSON.email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (formDataJSON.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    axios.post("/users/register", formDataJSON)
        .then((response) => {
            window.location.href = "/";
        }).catch((error) => {

        }).finally(() => {

        });
});

const loginForm = document.getElementById('userLogin');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataJSON = {};
    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    const { email, password } = formDataJSON;
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // if (!emailPattern.test(email)) {
    //     alert("Please enter a valid email address.");
    //     return false;
    // }

    // if (password.length < 6) {
    //     alert("Password must be at least 6 characters long.");
    //     return false;
    // }
    axios.post("/users/login", formDataJSON)
        .then(() => {
            window.location.href = "/";
        }).catch((error) => {
            alert("Incorrect username or password.");
        }).finally(() => {

        });
});

const logout = () => {
    axios.post("/users/logout")
        .then(() => {
            window.location.href = "/";
        }).catch((error) => {
            alert("Something went wrong.");
        })

}


const dont = [
    "Don't neglect your physical health. Remember that your physical and mental health are interconnected.",
    "Avoid excessive use of alcohol, drugs, or other substances as a way to cope with stress or emotional issues.",
    "Don't isolate yourself. Stay connected with others and reach out for support when needed.",
    "Avoid dwelling on negative thoughts or ruminating on past events. Practice self-compassion and focus on solutions.",
    "Don't ignore warning signs of mental health problems in yourself or others. Early intervention is key to effective treatment.",
    "Avoid comparing yourself to others, especially on social media. Remember that everyone's journey is unique.",
    "Don't be afraid to set boundaries and say no to things that drain your energy or contribute to stress."
]
let tips = ""
dont.forEach(item => {
    tips += `<li>${item}</li>`
})
const notToDo = document.querySelector("#not-to-do ul")
notToDo.innerHTML = tips

const dos = [
    "Practice relaxation techniques such as deep breathing, meditation, or progressive muscle relaxation.",
    "Engage in activities you enjoy and that bring you a sense of fulfillment.",
    "Reach out to friends, family, or support groups for social connection and emotional support.",
    "Set realistic goals and celebrate your achievements, no matter how small.",
    "Prioritize self-care activities, including getting enough sleep, eating nutritious foods, and exercising regularly.",
    "Practice mindfulness and stay present in the moment, focusing on what you can control.",
    "Seek professional help if you're struggling with your mental health. Therapy or counseling can provide valuable support and guidance."
]
tips = ""
dos.forEach(item => {
    tips += `<li>${item}</li>`
})
const toDo = document.querySelector("#to-do ul")
toDo.innerHTML = tips