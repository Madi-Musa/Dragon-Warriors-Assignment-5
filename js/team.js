const members = [
    {
        id: "madi",
        name: "Mussa Madi",
        role: "Fitness Trainer",
        age: 18,
        city: "Astana",
        experience: "1 year",
        image: "images/madi.png",

        getDescription() {
            return `My name is ${this.name}. I live in ${this.city}.
                    I am a fitness trainer at Dragon Warriors Fitness
                    with ${this.experience} of experience.`;
        }
    },
    {
        id: "miras",
        name: "Sapan Miras",
        role: "Fitness Trainer",
        age: 18,
        city: "Astana",
        experience: "2 years",
        image: "images/miras.png",

        getDescription() {
            return `My name is ${this.name}. I live in ${this.city}.
                    I am a fitness trainer at Dragon Warriors Fitness
                    with ${this.experience} of experience.`;
        }
    }
];

const teamList = document.getElementById("team-list");

for (let i = 0; i < members.length; i++) {
    const member = members[i];

    teamList.innerHTML += `
        <div class="col-12 col-lg-6">
            <article class="member-card h-100 p-3 p-lg-4"
                     id="${member.id}">
                <img class="member-photo d-block mx-auto mb-4"
                     src="${member.image}"
                     alt="${member.name}"
                     loading="lazy">

                <h3 class="mb-2">${member.name}</h3>
                <p class="member-role mb-3">${member.role}</p>

                <p class="member-bio mb-3">
                    ${member.getDescription()}
                </p>

                <ul class="member-details list-unstyled p-0 mt-4 mb-0">
                    <li class="py-3">
                        <strong>Age</strong>
                        <span>${member.age} years old</span>
                    </li>
                    <li class="py-3">
                        <strong>City</strong>
                        <span>${member.city}</span>
                    </li>
                    <li class="py-3">
                        <strong>Fitness experience</strong>
                        <span>${member.experience}</span>
                    </li>
                </ul>
            </article>
        </div>
    `;
}