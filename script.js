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
    },
    {
        id: "CERT-578",
        name: "GUDE VISHNU VARDHAN",
        email: "gudevishnuvardhan6@gmail.com",
        domain: "Full Stack Web Development",
        type: "Internship Certificate",
        file: "certificates/CERT-578.pdf"
    }
];

const form = document.getElementById("verifyForm");
const result = document.getElementById("result");


/* =========================================
   TEXT CLEANING FUNCTIONS
========================================= */

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


/* =========================================
   DISPLAY VERIFIED CERTIFICATE
========================================= */

function showVerifiedCertificate(intern) {

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

        <strong>Certificate Type:</strong> ${intern.type}
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


/* =========================================
   DISPLAY FAILED VERIFICATION
========================================= */

function showVerificationFailed() {

    result.classList.remove("hidden");

    result.innerHTML = `
        <strong>✕ Verification Failed</strong>
        <br><br>

        The details entered do not match a valid certificate.
    `;

    result.style.background = "#fff3f3";
    result.style.borderColor = "#f0b8b8";
    result.style.color = "#a32929";
}


/* =========================================
   MANUAL VERIFICATION
========================================= */

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


    if (verifiedIntern) {

        showVerifiedCertificate(verifiedIntern);

    } else {

        showVerificationFailed();

    }

});


/* =========================================
   QR CODE / DIRECT CERTIFICATE VERIFICATION
========================================= */

/*
   Example:

   https://seerapusuresh.github.io/
   intern-certificate-verification-check/
   ?cert=CERT-578

*/

function verifyCertificateFromURL() {

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const certificateID = urlParams.get("cert");


    // No certificate ID in URL
    if (!certificateID) {
        return;
    }


    // Find certificate
    const verifiedIntern = interns.find(function (intern) {

        return (
            intern.id.toLowerCase() ===
            certificateID.trim().toLowerCase()
        );

    });


    // Certificate found
    if (verifiedIntern) {

        showVerifiedCertificate(verifiedIntern);

        // Optional: scroll directly to verification result
        setTimeout(function () {

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);

    } else {

        showVerificationFailed();

        setTimeout(function () {

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);

    }
}


/* =========================================
   RUN QR VERIFICATION WHEN PAGE LOADS
========================================= */

verifyCertificateFromURL();
