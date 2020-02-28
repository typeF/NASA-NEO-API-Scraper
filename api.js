const request = require("request");
const fs = require("fs");
const dotenv = require("dotenv").config();
const moment = require("moment");
const jsonfile = require("jsonfile");

let date = moment(process.argv[2]).format("YYYY-MM-DD");
// console.log('date test is: ', dateTest);
// let date = '1923-01-01';

const APIOptions = {
  start_date: moment(date).format("YYYY-MM-DD"),
  end_date: moment(date)
    .add(7, "days")
    .format("YYYY-MM-DD"),
  api_key: process.env.API_KEY
};

const path = `json/test.json`;

// Downloads JSON data into a single file
// function downloadNeo(filePath) {
//   let nasaAPIRequest = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${APIOptions.start_date}&end_date=${APIOptions.end_date}&api_key=${APIOptions.api_key}`;
//   request(nasaAPIRequest, (err, res, body) => {
//     const data = JSON.parse(body);
//     for (let dateX in data.near_earth_objects) {
//       let blob1 = {};
//       const year = moment(dateX).format('YYYY');

//       if (!fs.existsSync(`./test/${year}/`)) {
//         console.log('trying to make dr')
//         fs.mkdirSync(`test/${year}/`);
//       }

//       try {
//         blob1 = JSON.parse(fs.readFileSync(`./test/${year}/${year}.json`));
//       } catch (err) {
//         console.log('File does not exist', err);
//       }

//       let blob = {};

//       blob[dateX] = data.near_earth_objects[dateX];
//       blob[dateX].forEach((neo, i) => {
//         delete blob[dateX][i].links;
//         delete blob[dateX][i].neo_reference_id;
//         delete blob[dateX][i].nasa_jpl_url;
//         delete blob[dateX][i].absolute_magnitude_h;
//         delete blob[dateX][i].estimated_diameter.kilometers;
//         delete blob[dateX][i].estimated_diameter.miles;
//         delete blob[dateX][i].estimated_diameter.feet;
//         delete blob[dateX][i].close_approach_data[0].epoch_date_close_approach;
//         delete blob[dateX][i].close_approach_data[0].relative_velocity.kilometers_per_hour;
//         delete blob[dateX][i].close_approach_data[0].relative_velocity.miles_per_hour;
//         delete blob[dateX][i].close_approach_data[0].miss_distance.astronomical;
//         delete blob[dateX][i].close_approach_data[0].miss_distance.lunar;
//         delete blob[dateX][i].close_approach_data[0].miss_distance.miles;
//         delete blob[dateX][i].close_approach_data[0].orbiting_body;
//       })

//       let finalBlob = Object.assign(blob1, blob);
//       jsonfile.writeFileSync(`./test/${year}/${year}.json`, finalBlob);
//       console.log(`Data for ${dateX} added`);
//     }

//   });
// }

function downloadNeo(filePath) {
  let nasaAPIRequest = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${APIOptions.start_date}&end_date=${APIOptions.end_date}&api_key=${APIOptions.api_key}`;
  request(nasaAPIRequest, (err, res, body) => {
    const data = JSON.parse(body);
    for (let dateX in data.near_earth_objects) {
      const year = moment(dateX).format("YYYY");
      const blob = data.near_earth_objects[dateX];
      for (let neo in blob) {
        delete blob[neo].links;
        delete blob[neo].neo_reference_id;
        delete blob[neo].nasa_jpl_url;
        delete blob[neo].absolute_magnitude_h;
        delete blob[neo].estimated_diameter.kilometers;
        delete blob[neo].estimated_diameter.miles;
        delete blob[neo].estimated_diameter.feet;
        delete blob[neo].close_approach_data[0].epoch_date_close_approach;
        delete blob[neo].close_approach_data[0].relative_velocity
          .kilometers_per_hour;
        delete blob[neo].close_approach_data[0].relative_velocity
          .miles_per_hour;
        delete blob[neo].close_approach_data[0].miss_distance.astronomical;
        delete blob[neo].close_approach_data[0].miss_distance.lunar;
        delete blob[neo].close_approach_data[0].miss_distance.miles;
        delete blob[neo].close_approach_data[0].orbiting_body;
      }
      if (!fs.existsSync(`./json/${year}`)) {
        fs.mkdirSync(`json/${year}`);
      }
      fs.writeFileSync(`./json/${year}/${dateX}.json`, JSON.stringify(blob));
      console.log(`Data for ${dateX} added`);
    }
  });
}

const tasks = Array(5000).fill(1);
// .map((x, i) => date);//moment().add(i, 'days'))

const worker = () => {
  const task = tasks.shift();
  if (task === undefined) clearInterval(timer);
  APIOptions.start_date = moment(date).format("YYYY-MM-DD");
  APIOptions.end_date = moment(date)
    .add(7, "days")
    .format("YYYY-MM-DD");
  downloadNeo(path);
  date = moment(date).add(8, "days");
};

const timer = setInterval(worker, 4000);
timer;
