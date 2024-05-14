"use strict";
const Replicate = require("replicate");
const replicate = new Replicate({
  auth: "r8_LZjMjWJFWIopyUHoGwJ5HPvc5TFEfwy26azEW"
});
const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = {
  prompt: "I need a small room with 21 degrees of light, 34 ultrasonic, 45 temperture and 56 humidity"
};
document.getElementById("generate-btn").addEventListener("click", async () => {
  try {
    const res = await replicate.run(model, { input });
    const imageUrl = res[0];
    console.log(imageUrl);
    const imgElement = document.getElementById("generated-image");
    imgElement.src = imageUrl;
    imgElement.style.display = "block";
  } catch (error) {
    console.error("Error generating image:", error);
  }
});
//# sourceMappingURL=index.js.map
