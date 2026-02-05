import express from "express";

const listen = () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send(
      `
<!DOCTYPE html>
<html lang="en">
  <head>
   <meta charset="UTF-8">
   <title>Test</title>
  </head>
  <body>
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <script>
let stream;
let mr;
let chunks = [];
let startTime;

document.getElementById("start").addEventListener("click", async () => {
  stream = await window.navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
  mr = new MediaRecorder(stream);

  mr.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mr.onstop = async () => {
    const duration = Date.now() - startTime;
    const buggyBlob = new Blob(chunks, { type: chunks[0].type });
    stream.getTracks().forEach(track => track.stop());

    // Will crash before we get here
    console.log("will not happen");
  };

  mr.start();
  startTime = Date.now();
});

document.getElementById("stop").addEventListener("click", () => {
  mr.stop();
});
    </script>
  </body>
</html>
    `.trim(),
    );
  });
  const server = app.listen(3000);

  return server;
};

listen();