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

//Do-dont's


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


//Tips:-
const tips2 = [
    {
        "title": "Practice Self-Care Daily",
        "description": "Take time each day to do something that brings you joy and relaxation, whether it's reading a book, going for a walk, or practicing meditation."
    },
    {
        "title": "Stay Connected",
        "description": "Maintain strong relationships with friends and family members. Social support is crucial for mental well-being."
    },
    {
        "title": "Get Regular Exercise",
        "description": "Physical activity is not only good for your body but also for your mind. Aim for at least 30 minutes of exercise most days of the week."
    },
    {
        "title": "Eat a Balanced Diet",
        "description": "Fuel your body and brain with nutritious foods. A balanced diet rich in fruits, vegetables, whole grains, and lean proteins can positively impact your mood and energy levels."
    },
    {
        "title": "Practice Mindfulness",
        "description": "Stay present in the moment and cultivate mindfulness through practices like deep breathing, meditation, or yoga. Mindfulness can help reduce stress and anxiety."
    },
    {
        "title": "Seek Professional Help When Needed",
        "description": "If you're struggling with your mental health, don't hesitate to reach out to a therapist, counselor, or mental health professional for support and guidance."
    },
    {
        "title": "Limit Screen Time",
        "description": "Excessive screen time, especially on social media, can negatively impact your mental health. Set boundaries and take regular breaks from digital devices."
    },
    {
        "title": "Establish Healthy Sleep Habits",
        "description": "Prioritize getting enough sleep each night. Aim for 7-9 hours of quality sleep to support your overall well-being."
    },
    {
        "title": "Practice Gratitude",
        "description": "Take time each day to reflect on the things you're grateful for. Practicing gratitude can help shift your focus from negativity to positivity."
    }
]
let html = ""
for (let index = 0; index < tips2.length/2; index++) {
    html += ` <div class="flex w-full h-full flex-col card-section">
    <div class="card">
        <div class="image">
            <img src="../public/images/tips.png" alt="">
        </div>
        <div class="text">
            <h3 class="text-md">${tips2[index].title}</h3>
            <p class="text-sm">
            ${tips2[index].description}
            </p>
        </div>
    </div>
</div>`

}
document.querySelector(".cards").innerHTML=html