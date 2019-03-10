## Buenos Aires Crime Dataset
This repository contains a single file, automatically updated with more than `350,980` reported crimes committed in the City of Buenos Aires since 2016.

### Motive
Although the data is public (see section 'Clarification'), a complete file is not available for downloading, with all the fields, to simplify the analysis of them. This repository solves that problem.

### Data
The file in `JSON` format, is named `delitos.json`.

Campo | Tipo | Descripción
-- | -- | --
id | Number | Unique crime identifier
comuna | String | Name of commune
barrio | String | Neighborhood name
latitud | Number | Latitude of the crime scene
longitud | Number | Longitude of crime scene
fecha | String | Crime date in `YYYY-MM-DD` format
hora | String | Crime time in `hhh: mm: ss` format
uso_arma | String | Describes whether the robbery was armed
uso_moto | String | Describes if the robbery was made by a motorcycle robber
origen_dato | String | Describes the origin of the complaint
tipo_delito | String | Describes the type of crime
cantidad_vehiculos | Number | Number of vehicles involved
cantidad_victimas | Number | Number of fatalities

### Example
```JSON
{ "id": 120814,
  "comuna": "Comuna 11",
  "barrio": "VILLA DEVOTO",
  "latitud": -34.605,
  "longitud": -58.5105,
  "fecha": "2016-12-13",
  "hora": "23:05:00",
  "uso_arma": "SIN USO DE ARMA",
  "uso_moto": "SIN MOTO",
  "origen_dato": null,
  "tipo_delito": "Lesiones Seg Vial",
  "cantidad_vehiculos": 1,
  "cantidad_victimas": 0 }
```

### Clarification
These data are public and available for viewing on the official website [http://mapa.seguridadciudad.gob.ar/](http://mapa.seguridadciudad.gob.ar/)
