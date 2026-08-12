const interns = [
    {
        id: "CERT-001",
        name: "Donga Hemanth",
        email: "dongahemanth111@gmail.com",
        domain: "Solid Works",
        type: "Internship Certificate",
        file: "certificates/CERT-001.pdf"
    },
    {
        id: "CERT-002",
        name: "KURELLA DHANA SRI VENKATA NARASIMHA SATYA KONDA",
        email: "nanikurella132@gmail.com",
        domain: "Solid Works",
        type: "Internship Certificate",
        file: "certificates/CERT-002.pdf"
    }
];

const form = document.getElementById("verifyForm");
const result = document.getElementById("result");

function cleanText(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function cleanEmail(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/^\[|\]$/g, "")
        .replace(/mailto:/g, "")
        .replace(/[<>]/g, "")
        .replace(/\s/g, "");
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = cleanText(
        document.getElementById("name").value
    );

    const email = cleanEmail(
        document.getElementById("email").value
    );

    const domain = cleanText(
        document.getElementById("domain").value
    );

    const type = document.getElementById("type").value.trim();

    const verifiedIntern = interns.find(function (intern) {
        return (
            cleanText(intern.name) === name &&
            cleanEmail(intern.email) === email &&
            cleanText(intern.domain) === domain &&
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

            <a href="${verifiedIntern.file}" target="_blank" rel="noopener">
                VIEW CERTIFICATE
            </a>
        `;

        result.style.background = "#effcf4";
        result.style.borderColor = "#bce8cb";
        result.style.color = "#176b3a";

    } else {

        result.innerHTML = `
            <strong>✕ Verification Failed</strong>
            <br><br>
            The details entered do not match a certificate.
        `;

        result.style.background = "#fff3f3";
        result.style.borderColor = "#f0b8b8";
        result.style.color = "#a32929";
    }
});
