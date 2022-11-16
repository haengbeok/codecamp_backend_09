import GpxParser from "gpxparser";
import fs from "fs-extra";

const file = fs.readFileSync("./491303004_gpx/PMNTN_법정악_491303004.gpx");
let gpx = new GpxParser();

gpx.parse(file);

// console.log(file);
console.log(gpx.tracks[0].points[0]);
// console.log(info);
// let totalDistance = gpx.tracks;
