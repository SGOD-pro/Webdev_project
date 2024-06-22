
//Do-dont's

const dont =  [
    "Prioritize your physical health; it directly affects your mental well-being.",
    "Limit alcohol, drugs, and other substances as coping mechanisms.",
    "Stay connected; don't isolate yourself and seek support when needed.",
    "Avoid negative thinking and focus on solutions with self-compassion.",
    "Recognize and address mental health warning signs early for effective treatment."
]
let tips = ""
dont.forEach(item => {
    tips += `<div class="text">
    ${item}
</div>`
})
const notToDo = document.querySelector("#donts-text")
notToDo.innerHTML = tips

const dos = [
    
    "Engage in fulfilling activities you enjoy.",
    "Connect with friends, family, or support groups.",
    "Set realistic goals and celebrate small achievements.",
    
    "Practice mindfulness and focus on what you can control.",
    "Seek professional help if struggling with mental health."
]
tips = ""
dos.forEach(item => {
    tips += `<div class="text">
                              ${item}
                          </div>`
})
const toDo = document.querySelector("#does-text")
toDo.innerHTML = tips


//Tips:-
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let tips2 = [
    {
        "title": "Practice Self-Care Daily",
        "description": "Take time each day to do something that brings you joy and relaxation, whether it's reading a book, going for a walk, or practicing meditation.",
        url: "selfcare.jpg"
    },
    {
        "title": "Stay Connected",
        "description": "Maintain strong relationships with friends and family members. Social support is crucial for mental well-being.",
        url: "stayconnected.png"
    },
    {
        "title": "Get Regular Exercise",
        "description": "Physical activity is not only good for your body but also for your mind. Aim for at least 30 minutes of exercise most days of the week."
        , url: "exercise.png"
    },
    {
        "title": "Eat a Balanced Diet",
        "description": "Fuel your body and brain with nutritious foods. A balanced diet rich in fruits, vegetables, whole grains, and lean proteins can positively impact your mood and energy levels."
        , url: "healtyhydiet.jpg"
    },
    {
        "title": "Practice Mindfulness",
        "description": "Stay present in the moment and cultivate mindfulness through practices like deep breathing, meditation, or yoga. Mindfulness can help reduce stress and anxiety."
        , url: "Mindfulness_8gqa.png"
    },
    {
        "title": "Seek Professional Help When Needed",
        "description": "If you're struggling with your mental health, don't hesitate to reach out to a therapist, counselor, or mental health professional for support and guidance."
        , url: "advice.jpg"
    },
    {
        "title": "Limit Screen Time",
        "description": "Excessive screen time, especially on social media, can negatively impact your mental health. Set boundaries and take regular breaks from digital devices."
        , url: "3917187.jpg"
    },
    {
        "title": "Establish Healthy Sleep Habits",
        "description": "Prioritize getting enough sleep each night. Aim for 7-9 hours of quality sleep to support your overall well-being."
        , url: "sleep.jpg"
    },
    {
        "title": "Practice Gratitude",
        "description": "Take time each day to reflect on the things you're grateful for. Practicing gratitude can help shift your focus from negativity to positivity.",
        url: "Practice Gratitude.jpg"
    },
]
tips2 = shuffleArray(tips2)

let html = ""
for (let index = 0; index < tips2.length / 2; index++) {
    let dic = 1
    if (index % 2 !== 0) {
        dic *= -1
    }
    html += `
     <div class="flex w-full h-full flex-col card-section" data-scroll data-scroll-speed="${dic}" data-scroll-direction="horizontal">
    <div class="card" >
        <div class="image">
            <img src="/images/${tips2[index].url}" alt="no">
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
document.querySelector(".cards").innerHTML = html

window.onload = function () {
    localStorage.clear()
}