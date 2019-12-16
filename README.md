# GNocilla
Trabajo de SSR para la creación de una red P2P desestructrada

## Caracteristicas
- El par escucha en el puerto **42069**
- Uso de 2 listas de IPS:
	- Lista de nodos Gnocilla
	- Lista de nodos Gnocilla activos
- Carpeta donde se comparten los archivos **sandwichDeNocilla** 

## MENU
1. Buscar archivos
2. Mostrar archivos disponibles
3. Mostrar archivos compartidos
4. Help
5. Credits

## Protocolos
### Protocolo de descubrir pares en la misma LAN
1. Los pares escuchan al puerto 42069
2. Un nuevo par, debe conocer la IP de algún otro par (P.e. a través de una web) que ya pertenezca a la red, le solicita a este la lista de pares, a través de ese puerto.
3. El par que recibe la lista, envía un paquete REBANADADE (ping) a todos los pares de la lista.
	- El nuevo par lanza un mensaje “Rebanadade” de tipo ping a la IP del nodo de la red.
	- Si el par está activo, responderá “GNOCILLA” y se medirá el tiempo de respuesta.
4. Se solicitará la lista de pares de ese par y se repetirá el protocolo con cada uno de los pares obtenidos.

### Protocolo de búsqueda de archivos.
1. Descubrir a los pares.
2. Se pregunta a los pares si tienen el archivo.
	- Mensaje que incluye la IP del par que origina la búsqueda.
	- Un par que tenga el archivo se lo comunica al origen.
	- Un par que no tenga el archivo reenvía la búsqueda a sus pares.
3. Con las respuestas que reciba, el usuario decide qué archivo descargar.

### Protocolo para compartir un archivo
1. En la carpeta “sandwichDeGnocilla”, el usuario introducirá los archivos que desea compartir.
2. Al iniciar el programa, busca los archivos para compartir directamente en este directorio.
3. Si un nodo le pregunta qué archivos tiene para compartir, éste le responde con una lista de archivos a compartir.
4. Cuando un par le solicite un archivo de esta lista, este par abrirá un puerto TCP aleatorio a la escucha y se lo dirá al par que ha solicitado el archivo.
5. El solicitante iniciará una conexión TCP con el puerto indicado, y una vez se han conectado, el que tiene el fichero comienza a enviarlo.

## Prerequisitos
### Tener nodejs Y npm
Instalar nodejs en Ubuntu.
```
sudo apt-get update; sudo apt-get install nodejs npm -y
```
### Instalar dependencias
Dentro de la carpeta de GNocilla ejecutamos:
```
npm install
```
## Ejecución
```
node gnocilla.js <IP Usuario> <IP de un nodo GNocilla>
```

### Comparitr un archivo (Primer par)
1. Introducir el archivo a compartir en la carpeta “sandwichDeGnocilla”.
2. Ejecutar el programa sin necesidad de indicar la IP de un nodo host de GNocilla

### Descargar un archivo disponible
1. Ejecutar el programa escribiendo “gnocilla.js <IP Usuario> <IP Nodo GNOCILLA>
2. Seleccionamos la opción de “Buscar archivos”
3. Introducimos una palabra de búsqueda. No introducir nada para buscar todoslos archivos disponibles.
4. Seleccionamos uno de los archivos
5. Se descarga el archivo en "sandwichDeGnocilla".

# Miembros del grupo
* [grvmiguel](https://github.com/grvmiguel)
* [shadowsofdust](https://github.com/shadowsofdust)
* [Marmeus](https://github.com/Marmeus/)
* [carborfo](https://github.com/carborfo)
