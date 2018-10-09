const fs = require('fs');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const omit = require('lodash.omit');
const keys = require('lodash.keys');
const _ = require('lodash');

// Auxiliary functions
function cartesian(...rest) {
  return Array.prototype.reduce.call(rest, function(a, b) {
    var ret = [];
    a.forEach(function(a) {
      b.forEach(function(b) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
}

dotenv.config()
const URI = process.env.URI;

// Parameters to get all the data
const params = {
  years: [2016, 2017],
  months: Array.from({ length: 12}).map((_, idx) => idx + 1),
  crimes: Array.from({ length: 20 }).map((_, idx) => idx)
}

// Program

const merge = () => {
  // Merge data

  const files = fs.readdirSync('downloaded');

  const merged = files.reduce((arr, fileName) => {
    const file = JSON.parse(fs.readFileSync(`downloaded/${fileName}`, 'UTF-8'));
    console.log(`✓ ${fileName} file read correctly`);
    return arr.concat(file);
  }, [])

  const filtered = _.uniqWith(merged, (a, b) => a.id === b.id);

  // Save merged data
  fs.writeFileSync('delitos.json', JSON.stringify(filtered));
  console.log(`✓ merged file created correctly`);
}

const clean = (delito) => {
  // Transform numeric fields into Numbers
  delito.id = Number(delito.id);
  delito.latitud = Number(delito.latitud);
  delito.longitud = Number(delito.longitud);
  delito.cantidad_victimas = Number(delito.cantidad_victimas);
  delito.cantidad_vehiculos = Number(delito.cantidad_vehiculos);

  // Filter out unnecessary Ids
  const unnecessaryKeys = keys(delito).filter(key => key.endsWith('Id'));
  return omit(delito, unnecessaryKeys);
}

const download = async () => {
  if (!fs.existsSync('downloaded')) fs.mkdirSync('downloaded');

  const reqs = cartesian(params.years, params.months, params.crimes);

  return Promise.all(reqs.map(async ([year, month, crime]) => {
    const uri = URI.replace('MONTH', month)
                   .replace('YEAR', year)
                   .replace('CRIME', crime);
    const id = `${year}-${month}|${crime}`;

    const res = await fetch(uri);
    if (!res.ok) return console.warn(`${id} file could not be downloaded`);

    const file = await res.json();
    const cleanFile = (file||[]).map(clean);
    
    console.log(`✓ ${id}  downloaded correctly`);

    if (file.length < 1) return;
    fs.writeFileSync(`downloaded/${id}.json`, JSON.stringify(cleanFile));
    console.log(`✓ ${id} file saved correctly`);
  }));
}

( async () => {
  await download();
  merge();
})();
