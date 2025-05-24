document.getElementById("logoInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            document.getElementById("logoPreview").src = evt.target.result;
            document.getElementById("logoPreview").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById("customText").addEventListener("input", function() {
    document.getElementById("textPreview").textContent = this.value;
});


function showFront() {
    document.getElementById("shirtImage").src = "https://i.imgur.com/IEhV6YQ.png";
}


function showBack() {
    document.getElementById("shirtImage").src = "https://i.imgur.com/t7eU7k1.png";
}