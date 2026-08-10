const interns = [
    {
        id: "CERT-001",
        name: "Donga Hemanth",
        email: "dongahemanth111@gmail.com",
        domain: "Solid Works",
        type: "Internship Certificate",
        file: "https://seerapusuresh.github.io/intern-certificate-verification-check/certificates/CERT-001.pdf"
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
        .replace(/^mailto:/, "")
        .replace(/\s/g, "");
}

function showVerified(intern) {

    result.classList.remove("hidden");

    result.innerHTML = `
        <strong>✓ Certificate Verified</strong>
        <br><br>

        <strong>Name:</strong> ${intern.name}
        <br>

        <strong>Certificate ID:</strong> ${intern.id}
        <br>

        <strong>Domain:</strong> ${intern.domain}
        <br>

        <strong>Status:</strong> VALID
        <br><br>

        <a href="${intern.file}" target="_blank" rel="noopener">
            VIEW CERTIFICATE
        </a>
    `;

    result.style.background = "#effcf4";
    result.style.borderColor = "#bce8cb";
    result.style.color = "#176b3a";
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
        showVerified(verifiedIntern);
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


/* ==========================================
   QR CODE AUTO VERIFICATION
   ========================================== */

const params = new URLSearchParams(window.location.search);
const certificateId = params.get("cert");

if (certificateId) {

    const qrCertificate = interns.find(function (intern) {
        return intern.id.toLowerCase() === certificateId.toLowerCase();
    });

    if (qrCertificate) {

        document.getElementById("name").value = qrCertificate.name;
        document.getElementById("email").value = qrCertificate.email;
        document.getElementById("domain").value = qrCertificate.domain;
        document.getElementById("type").value = qrCertificate.type;

        showVerified(qrCertificate);
    }
}
