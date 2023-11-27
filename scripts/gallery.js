const fs = require("fs");
const sharp = require("sharp");

const image_path = "../2023/foto";

console.log(
  "Prepare JSON format for https://www.npmjs.com/package/react-photo-gallery-next"
);

const processImages = async () => {
  let array = [];

  try {
    const photos = fs.readdirSync(image_path);

    // Process images sequentially
    await Promise.all(
      photos.map(async (p) => {
        let width, height;

        try {
          const info = await sharp(`${image_path}/${p}`).metadata();

          width = info.width > info.height ? 4 : 3;
          height = info.width > info.height ? 3 : 4;

          array.push({
            src: `https://data.diecezko.cz/2023/foto/${p}`,
            width: width,
            height: height,
          });
        } catch (err) {
          console.error(`Error processing image ${p}:`, err);
        }
      })
    );

    // Write array into the file
    const file = fs.createWriteStream(`${image_path}/images.json`);
    file.write(JSON.stringify(array));
    file.end();

    console.log("Processing completed successfully.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

// Call the function to start processing
processImages();
