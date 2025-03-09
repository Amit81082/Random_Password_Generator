// exercise - 7 
// Create javascrip program capable of generating a password which contains atleast one lowercase, one uppercase and one special characters. Create a password class to achieve the same.


class PasswordGenerator {
    constructor() {
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.passwordField = document.getElementById("password");
        this.strengthIndicator = document.getElementById("strengthIndicator");
        this.copyBtn = document.getElementById("copyBtn");
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.loadDarkMode();
            this.generatePassword();
        });

        document.getElementById("lengthSlider").addEventListener("input", () => {
            document.getElementById("lengthValue").innerText = document.getElementById("lengthSlider").value;
            this.generatePassword();
        });

        document.getElementById("darkModeToggle").addEventListener("click", () => this.toggleDarkMode());
        document.getElementById("generateBtn").addEventListener("click", () => this.generatePassword());
        document.getElementById("copyBtn").addEventListener("click", () => this.copyPassword());
        document.getElementById("toggleVisibility").addEventListener("click", () => this.toggleVisibility());
    }

    generatePassword() {
        const length = document.getElementById("lengthSlider").value;
        let characters = this.characters;

        if (document.getElementById("includeSymbols").checked) {
            characters += '!@#$%^&*()_+=-{}[]<>?';
        }

        let password = '';
        let randomArray = new Uint32Array(length);
        window.crypto.getRandomValues(randomArray);

        for (let i = 0; i < length; i++) {
            password += characters[randomArray[i] % characters.length];
        }

        this.passwordField.value = password;
        this.checkStrength(password);
    }

    copyPassword() {
        navigator.clipboard.writeText(this.passwordField.value);
        this.copyBtn.innerText = "Copied!";
        this.copyBtn.classList.add("copied");

        setTimeout(() => {
            this.copyBtn.innerText = "Copy";
            this.copyBtn.classList.remove("copied");
        }, 1500);
    }

    checkStrength(password) {
        let strength = "Weak 🔴";
        let strengthWidth = "20%";
        let strengthColor = "red";

        if (password.length >= 12 && /[!@#$%^&*()_+=-{}[\]<>?]/.test(password)) {
            strength = "Strong 💪✅";
            strengthWidth = "100%";
            strengthColor = "green";
        } else if (password.length >= 8) {
            strength = "Medium 🟡";
            strengthWidth = "60%";
            strengthColor = "orange";
        }

        document.getElementById("strength").innerText = `Strength: ${strength}`;
        this.strengthIndicator.style.width = strengthWidth;
        this.strengthIndicator.style.background = strengthColor;
    }

    toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    loadDarkMode() {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    toggleVisibility() {
        this.passwordField.type = this.passwordField.type === "password" ? "text" : "password";
    }
}

// Class ka instance create karna zaroori hai taki saari functionalities kaam karein
const passwordGenerator = new PasswordGenerator();
