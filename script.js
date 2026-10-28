const codeSecret = "1234"; // Définissez votre code ici

function checkCode() {
    const saisie = document.getElementById("passcode").value;
    const errorMsg = document.getElementById("error-msg");
    const authScreen = document.getElementById("auth-screen");
    const secretContent = document.getElementById("secret-content");

    if (saisie === codeSecret) {
        authScreen.style.display = "none";
        secretContent.style.display = "block";
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Code incorrect !";
    }
}

function lockSafe() {
    document.getElementById("auth-screen").style.display = "block";
    document.getElementById("secret-content").style.display = "none";
    document.getElementById("passcode.value") = "";
}
