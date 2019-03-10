## Dataset de Delitos en CABA
[Read in English](https://github.com/ramadis/delitos-caba/blob/master/README.en.md)

Este repositorio genera automáticamente un archivo único, actualizado con más de `350.980` delitos denunciados cometidos en la Ciudad de Buenos Aires desde el año 2016.

### Motivo
Si bien los datos son públicos (ver sección `Aclaración`), no está disponible para su descarga un archivo completo, con todos los campos, para simplificar el análisis de los mismos. Este repositorio soluciona ese problema.

### Datos
El archivo en formato `JSON` lleva por nombre `delitos` y puede ser descargado desde releases [en formato `JSON`](https://github.com/ramadis/delitos-caba/releases/download/3.0/delitos.json) o [en formato `CSV`](https://github.com/ramadis/delitos-caba/releases/download/3.0/delitos.csv).

Campo | Tipo | Descripción
-- | -- | --
id | Number | Identificador único del delito
comuna | String | Nombre de la comuna
barrio | String | Nombre del barrio
latitud | Number | Latitud del lugar del delito
longitud | Number | Longitud del lugar del delito
fecha | String | Fecha del delito en formato `YYYY-MM-DD`
hora | String | Hora del delito en formato `hh:mm:ss`
uso_arma | String | Describe si el robo fue armado
uso_moto | String | Describe si el robo fue por "motochorro"
origen_dato | String | Describe el origen de la denuncia
tipo_delito | String | Describe el tipo de delito
cantidad_vehiculos | Number | Cantidad de vehículos involucrados
cantidad_victimas | Number | Cantidad de víctimas fatales

### Ejemplo
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

### Aclaración
Estos datos son públicos y están disponibles para su visualización en la página oficial [http://mapa.seguridadciudad.gob.ar/](http://mapa.seguridadciudad.gob.ar/).