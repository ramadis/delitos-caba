const fetch = require("node-fetch");
const omit = require("lodash.omit");
const keys = require("lodash.keys");
const dotenv = require("dotenv");
const chalk = require("chalk");
const _ = require("lodash");
const fs = require("fs");

// Auxiliary functions
function cartesian(...rest) {
  return Array.prototype.reduce.call(
    rest,
    function(a, b) {
      var ret = [];
      a.forEach(function(a) {
        b.forEach(function(b) {
          ret.push(a.concat([b]));
        });
      });
      return ret;
    },
    [[]]
  );
}

dotenv.config();
const URI = process.env.URI;

// Parameters to get all the data
const params = {
  years: [2016, 2017, 2018],
  months: Array.from({ length: 12 }).map((_, idx) => idx + 1),
  crimes: [1] // id 1 represents all kinds of crimes
};

// Program

const generate = merged => {
  // Remove duplicated fields if they exist
  const filtered = _.uniqBy(merged, a => a.id);

  // Save merged data
  fs.writeFileSync("delitos.json", JSON.stringify(filtered));
  console.log(chalk.green(`✓ merged file created correctly`));
};

const clean = delito => {
  // Transform numeric fields into Numbers
  delito.id = Number(delito.id);
  delito.latitud = Number(delito.latitud);
  delito.longitud = Number(delito.longitud);
  delito.cantidad_victimas = Number(delito.cantidad_victimas);
  delito.cantidad_vehiculos = Number(delito.cantidad_vehiculos);

  // Filter out unnecessary Ids
  const unnecessaryKeys = keys(delito).filter(key => key.endsWith("Id"));
  return omit(delito, unnecessaryKeys);
};

const retries = [];

const download = async () => {
  const reqs = cartesian(params.years, params.months, params.crimes);

  return Promise.all(
    reqs.map(async ([year, month, crime]) => {
      const uri = URI.replace("MONTH", month)
        .replace("YEAR", year)
        .replace("CRIME", crime);
      const id = `${year}-${month}|${crime}`;

      try {
        const res = await fetch(uri);
        if (!res.ok) {
          console.log(chalk.red(`${id} file could not be downloaded`));
          return null;
        }

        const file = await res.json();
        const cleanFile = (file || []).map(clean);

        console.log(chalk.green(`✓ ${id}  downloaded correctly`));

        if (file.length < 1) return null;
        return cleanFile;
      } catch (e) {
        console.log(chalk.red(`${id} file could not be downloaded`));
        return null;
      }
    })
  );
};

(async () => {
  console.log(chalk.yellow(`Start downloading`));
  const downloads = await download();
  const merged = downloads.reduce((pv, cv) => (cv ? pv.concat(cv) : pv), []);
  console.log(chalk.yellow(`Start merging`));
  console.log(merged.length);
  generate(merged);
})();
