const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
    }
});

dropArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", function (event) {
    event.preventDefault();
    dropArea.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    if (file) {
        handleFile(file);
    }
});

function handleFile(file) {
    errorMessage.textContent = "";
    successMessage.textContent = "";
    previewContainer.style.display = "none";
    progressContainer.style.display = "none";

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
        errorMessage.textContent = "Invalid file! Please upload JPG, PNG or GIF.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        previewImage.src = event.target.result;
        previewContainer.style.display = "block";
    };

    reader.readAsDataURL(file);

    progressContainer.style.display = "block";

    let progress = 0;
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    const uploadSimulation = setInterval(function () {
        progress += 10;

        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(uploadSimulation);
            successMessage.textContent = "Upload completed successfully!";
        }
    }, 200);
}
