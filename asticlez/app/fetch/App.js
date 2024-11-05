'use client'

export default function fetchAndDisplayUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        
        const usersContainer = document.getElementById("users-container");
        usersContainer.innerHTML = ""; //clear any existing content

        data.forEach(user =>{
            const userDiv = document.createElement("div");
            userDiv.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email :</strong> ${user.email}</p>
                <p><strong>Phone :</strong> ${user.phone}</p>
                <p><strong>address :</strong> ${user.address.city}</p>
            `;
            usersContainer.appendChild(userDiv);
        })
    })
    
}

fetchAndDisplayUsers()
