const express = require("express");
const fs = require("fs/promises");

// const Router = express.Router();

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  let province_id,
    amphure_id,
    tambon_id,
    zipcode_id = "";
  let province_input = req.body.province;
  amphure_input = req.body.amphure;
  tambon_input = req.body.tambon;
  // const data = await fs.readFile("./src/Thailanddata.json", "utf-8");
  // province = JSON.parse(data);
  const data = await fetch(
    "https://raw.githubusercontent.com/jirad-n/thailand-all-area-code/master/src/Thailanddata.json"
  );
  province = await data.json();

  const i = province.findIndex((e) => e.name_th === province_input);
  findProvince: if (i > -1) {
    var p = province[i];
    var j = p.amphure.findIndex((e) => e.name_th === amphure_input);
    findAmphure: if (j > -1) {
      var a = p.amphure[j];
      var k = a.tambon.findIndex((e) => e.name_th === tambon_input);
      findTambon: if (k > -1) {
        var t = a.tambon[k];
      } else {
        break findTambon;
      }
    } else {
      break findAmphure;
    }
  } else {
    break findProvince;
  }

  // let province = Thailand.find((item) => item.name_th === province_input);
  // let amphure = province.amphure.find((item) => item.name_th === amphure_input);
  // let tambon = amphure.tambon.find((item) => item.name_th === tambon_input);
  province_id = p ? p.id : "";
  amphure_id = a ? a.id : "";
  tambon_id = t ? t.id : "";
  zipcode_id = t ? t.zip_code : "";
  res.status(200).json({
    provinceId: province_id,
    amphureId: amphure_id,
    tambonId: tambon_id,
    zipcode: zipcode_id,
  });
});

app.listen(8001, () => console.log("server running on port 8001"));

module.exports = app;
