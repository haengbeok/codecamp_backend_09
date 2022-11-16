const fs = require("fs-extra");

const result = fs.readFileSync("./491303004_geojson/PMNTN_법정악_491303004.json", "utf8");

// 산 + 등산로 정보
const info = JSON.parse(result);

// 좌표 정보
// const geo = info[0].paths;

// console.log(info);
console.log(info.features[0].geometry.paths[0]);
//console.log(geo);
