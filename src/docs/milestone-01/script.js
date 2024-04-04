const teamMembers = [
    {   img: 'people/Richard.jpg',
        role: "Richard Lu: Project Manager",
        description: 'A passion for fitness and working to be healthier, Richard wants to motivate others to do the same.'
    },
    {   img: 'people/Steven.jpeg',
        role: "Steven Tan: Front-End",
        description: 'Steven is an avid gymgoer who tries to exercise regularly while also balancing his academics as a computer science student.'
    },
    {   img: 'people/Wes.jpg',
        role: "Wesley Lathrop: Front-End",
        description: 'As someone who enjoys working out, but struggles to keep a consistent routine, Wes hopes to instill a drive in others who may have the same issue.'
    },
    {   img: 'people/Willy.png',
        role: "Willy Chen: Middleware",
        description: "Willy's average day consists of sitting down for hours in front of the screen, so a fitness management browser app would be of great use to him. Having a goal of improving his health, he represents the target audience of this application."
    },
    {   img: 'people/Matt.jpg',
        role: "Matthew Chung: Back-End",
        description: "As a newcomer to the gym scene, Matt offers a fresh view of fitness. He brings a relatable perspective on the initial uncertainties many face when stepping into this environment."
    }
];

let currentMemberIndex = 0; // Start with the first team member

function updateTeamMemberDisplay(index) {
    const memberImageElement = document.getElementById('memberImage');
    const memberRole = document.getElementById('member');
    const memberDescriptionElement = document.getElementById('memberDescription');

    // Update the src for the image and text for the description
    memberImageElement.src = teamMembers[index].img;
    memberImageElement.alt = `Team Member ${index + 1}`; // Update alt attribute for accessibility
    memberRole.textContent = teamMembers[index].role;
    memberDescriptionElement.textContent = teamMembers[index].description;
}

document.getElementById('nextMemberBtn').addEventListener('click', () => {
    // Increment the currentMemberIndex, wrap around if at the end of the array
    if (currentMemberIndex < teamMembers.length - 1) {
        currentMemberIndex++;
    } else {
        currentMemberIndex = 0; // Loop back to the first member
    }
    // Update the display with the next member's information
    updateTeamMemberDisplay(currentMemberIndex);
});

updateTeamMemberDisplay(currentMemberIndex); // Initializes the display with the first team member

