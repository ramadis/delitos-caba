const fs = require('fs');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const omit = require('lodash.omit');
const keys = require('lodash.keys');
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

dotenv.config()

const URI = process.env.URI;

const merge = () => {
  // Merge data
  const merged = months.reduce((arr, month) => {
    const file = JSON.parse(fs.readFileSync(`downloaded/${month}.json`, 'UTF-8'));
    console.log(`✓ ${month} file read correctly`);
    return arr.concat(file);
  }, [])

  // Save merged data
  fs.writeFileSync('delitos.json', JSON.stringify(merged));
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
  const toFilter = keys(delito).filter(key => key.endsWith('Id'));
  return omit(delito, toFilter);
}

const download = async () => {
  if (!fs.existsSync('downloaded')) fs.mkdirSync('downloaded');

  await Promise.all(months.map(async (month, number) => {
    // Download data for a given month
    const res = await fetch(URI.replace('MONTH', number + 1));
    if (!res.ok) return console.warn(`${month} file could not be downloaded`);
    const file = await res.json();
    const cleanFile = (file||[]).map(clean);
    console.log(`✓ ${month} downloaded correctly`);

    // Save data for a given month
    fs.writeFileSync(`downloaded/${month}.json`, JSON.stringify(cleanFile));
    console.log(`✓ ${month} file saved correctly`);
  }));
}

( async () => {
  await download();
  merge();
})();
