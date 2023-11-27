const sharp = require("sharp");
const fs = require("fs");
const { argv } = require("node:process");

const path = "../2023/foto";

const filename = argv[2];

sharp(`${path}/${filename}`)
        .resize(1200)
        .webp({ quality: 90, effort: 6 })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: "Diecezko.cz",
            },
          },
        })
        .toFile(`${path}/${filename}`.replace(/\.(jpg|jpeg|png)$/, ".webp"))
        .then((info) => {
          // console.log(info);
        })
        .catch((err) => {
          console.error(err);
        });
