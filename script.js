const interns = [
    {
        id: "CERT-001",
        name: "Donga Hemanth",
        email: "dongahemanth111@gmail.com",
        domain: "Solid Works",
        type: "Internship Certificate",
        file: "certificates/CERT-001.pdf"
    }
];

const form = document.getElementById("verifyForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim().toLowerCase();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const domain = document.getElementById("domain").value.trim().toLowerCase();
    const type = document.getElementById("type").value;

    const verifiedIntern = interns.find(function (intern) {
        return (
            intern.name.toLowerCase() === name &&
            intern.email.toLowerCase() === email &&
            intern.domain.toLowerCase() === domain &&
            intern.type === type
        );
    });

    result.classList.remove("hidden");

    if (verifiedIntern) {

        result.innerHTML = `
            <strong>✓ Certificate Verified</strong>
            <br><br>
            <strong>Name:</strong> ${verifiedIntern.name}
            <br>
            <strong>Certificate ID:</strong> ${verifiedIntern.id}
            <br>
            <strong>Domain:</strong> ${verifiedIntern.domain}
            <br>
            <strong>Status:</strong> VALID
            <br><br>
            <a href="${verifiedIntern.file}" target="_blank" download>
                DOWNLOAD CERTIFICATE
            </a>
        `;

        result.style.background = "#effcf4";
        result.style.borderColor = "#bce8cb";
        result.style.color = "#176b3a";

    } else {

        result.innerHTML = `
            ✕ Verification Failed
            <br><br>
            The details entered do not match a certificate.
        `;

        result.style.background = "#fff3f3";
        result.style.borderColor = "#f0b8b8";
        result.style.color = "#a32929";
    }
});
