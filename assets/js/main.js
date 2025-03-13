
document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide-container .slide");
    let firstSlide = document.getElementById("first-slide");
    let stageContainer = document.querySelector(".stage-container");
    let index = 0;

    function changeSlide() {
        if (index === 0) {
            firstSlide.style.display = "none";
            stageContainer.style.display = "block";
        }

        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");

        index = (index + 1) % slides.length;
    }

    setTimeout(() => {
        changeSlide();
        setInterval(changeSlide, 3000);
    }, 3000);
});
function toggleMenu() {
document.querySelector(".nav-links").classList.toggle("active");
}


// whatsp
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let tickets = document.getElementById("tickets").value.trim();
    let address = document.getElementById("address").value.trim();
    let email = document.getElementById("email").value.trim();
    let ticketButton = document.getElementById("ticketButton");

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^[0-9]{10}$/;

    ticketButton.disabled = !(name && phonePattern.test(contact) && tickets && address && emailPattern.test(email));
}

function sendToWhatsApp() {
    let name = document.getElementById("name").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let tickets = document.getElementById("tickets").value.trim();
    let address = document.getElementById("address").value.trim();
    let email = document.getElementById("email").value.trim();

    let phonePattern = /^[0-9]{10}$/;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !phonePattern.test(contact) || !tickets || !address || !emailPattern.test(email)) {
        alert("Please fill all fields correctly.");
        return;
    }

    let scriptURL = "https://script.google.com/macros/s/AKfycbxwCK7VsFUf3bA_kRB--Rf97ToEsWO5NyC4bU631DrvsCZjfZ-pIYwU1HR1tLt5d6JPJw/exec";
    let formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("tickets", tickets);
    formData.append("address", address);

    fetch(scriptURL, { method: "POST", body: formData })
        .then(response => response.text())
        .then(() => {
            let message = `Hello, I want to book tickets.%0A%0A*Name:* ${name}%0A*Contact:* ${contact}%0A*Email:* ${email}%0A*Tickets:* ${tickets}%0A*Address:* ${address}`;
            let whatsappURL = `https://wa.me/918277328080?text=${message}`;
            window.open(whatsappURL, "_blank");
        })
        .catch(error => {
            alert("There was an error submitting the form. Please try again.");
            console.error("Error:", error);
        });
}
