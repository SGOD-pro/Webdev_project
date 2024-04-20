

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
