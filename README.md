# Proyecto 01: Web Service para Consulta de Clima en Aeropuertos

**Universidad Nacional Autónoma de México**  
**Facultad de Ciencias**  
**Modelado y Programación**  
**Fecha:** 29 de Agosto de 2023

## 1. Introducción

Hoy en día, grandes sitios web como Facebook, Google y Microsoft hacen uso de servicios web para intercambiar datos entre aplicaciones. Estos servicios son independientes de las aplicaciones y permiten a las organizaciones intercambiar datos sin necesidad de conocer los detalles de sus respectivos sistemas de información. Este proyecto tiene como objetivo desarrollar una aplicación que utilice estos servicios para consultar en tiempo real el clima de ciudades específicas, siendo de especial utilidad para aeropuertos y sus usuarios.

## 2. Descripción del Proyecto

El aeropuerto de la Ciudad de México requiere una aplicación que muestre el informe del clima de la ciudad de salida y la ciudad de llegada para tickets que salen el mismo día. La aplicación debe ser:

- **Interactiva:** fácil de usar para sobrecargos, pilotos y clientes promedio.
- **Intuitiva:** la interfaz debe ser clara y sencilla.
- **Amigable:** solo se mostrará la información relevante del clima.

### Características Principales:

- Utilización de web services para consultar el clima, como OpenWeatherMap.
- Manejo de errores y posibles fallos en la aplicación.
- Posibilidad de cache para evitar duplicidad en consultas al web service.
- Aceptación de errores en la entrada, por ejemplo: "Monterye", "Montery", "Monterey" y "MTY" deberían mostrar el clima de Monterey.

## 3. Instalación y Uso

### Pre-requisitos

Asegúrese de tener instalado Node.js y npm (o Yarn) en su sistema. Puede descargarlo desde [el sitio oficial de Node.js](https://nodejs.org/).

### Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/MxDui/proyecto1-modelado.git
   ```

2. **Ir al directorio del proyecto**:

   ```bash
   cd proyecto1-modelado
   ```

3. **Instalar dependencias**:
   Usando npm:

   ```bash
   npm install
   ```

   Usando Yarn:

   ```bash
   yarn install
   ```

4. **Iniciar la aplicación**:

   - **Modo desarrollo**:

     ```bash
     npm run dev
     ```

     O si usa Yarn:

     ```bash
     yarn dev
     ```

   - **Modo producción**:
     Primero, construya la aplicación:

     ```bash
     npm run build
     ```

     O si usa Yarn:

     ```bash
     yarn build
     ```

     Luego, inicie la aplicación:

     ```bash
     npm start
     ```

     O si usa Yarn:

     ```bash
     yarn start
     ```

La aplicación debería estar corriendo en [http://localhost:3000](http://localhost:3000).

### Ejecución de Pruebas con Cypress

1. **Iniciar Cypress en modo interactivo**:

   Esto abrirá la interfaz de Cypress donde podrá seleccionar y ejecutar sus pruebas.

   ```bash
   npm run cypress:open
   ```

   O si usa Yarn:

   ```bash
   yarn cypress:open
   ```

2. **Ejecutar Cypress en modo headless**:

   Esto ejecutará las pruebas en el fondo y le proporcionará un resumen en la terminal.

   ```bash
   npm run cypress:run
   ```

   O si usa Yarn:

   ```bash
   yarn cypress:run
   ```

### Notas

- Asegúrese de que la aplicación esté corriendo cuando ejecute las pruebas con Cypress.
- En caso de errores o problemas, consulte la documentación oficial de [Next.js](https://nextjs.org/docs) o [Cypress](https://www.cypress.io/documentation/).

## 4. Estructura del Proyecto

La estructura del proyecto debe ser clara e intuitiva, pensando en un mantenimiento posterior a la entrega.

_Descripción de la estructura de carpetas y archivos aquí._

---

## 5. Pruebas

Se han implementado pruebas para garantizar el correcto funcionamiento de las páginas principales de la aplicación. A continuación se presentan los detalles de estas pruebas.

### 5.1 Pruebas de la Página de Inicio

La página de inicio presenta una ilustración y un botón para redirigir al usuario a la página de consulta del clima por ciudades o boleto.

**Pruebas Implementadas**:

1. **Carga de la Página de Inicio Correctamente**:
   - Verifica que el título principal "Clima Aeropuerto" es visible.
   - Al pasar el cursor sobre la ilustración, verifica las interacciones (por ejemplo, efecto de zoom).
   - Verifica la visibilidad y funcionalidad del botón "Empezar".

### 5.2 Pruebas de la Página de Clima

En esta página, los usuarios pueden consultar el clima de sus ciudades de salida y llegada mediante el nombre de las ciudades o el código del boleto.

**Pruebas Implementadas**:

1. **Búsqueda por Ciudades**:

   - Selecciona la opción "Ciudades" del selector.
   - Introduce las ciudades de "Salida" y "Llegada".
   - Verifica las llamadas a la API y los resultados mostrados para ambas ciudades.

2. **Búsqueda por Boleto**:
   - Selecciona la opción "Boleto" del selector.
   - Introduce el código del boleto.
   - Verifica las llamadas a la API basadas en las ciudades decodificadas del boleto y muestra los resultados.

---

**Instrucciones para ejecutar las pruebas**:

Las pruebas se realizan utilizando Cypress. Para ejecutar estas pruebas, sigue los siguientes pasos:

1. Asegúrate de tener Cypress instalado en tu proyecto. Si no lo tienes, puedes instalarlo usando `npm install cypress --save-dev`.
2. Desde el directorio raíz de tu proyecto, abre el terminal y ejecuta `cypress open`.
3. En la interfaz gráfica de Cypress que aparece, selecciona las pruebas que desees ejecutar (por ejemplo, "landing_page_spec.js" o "weather_page_spec.js").
4. Cypress ejecutará las pruebas y mostrará los resultados en tiempo real.

---

## 6. Contribuciones

## 7. Licencia

_Información sobre la licencia aquí._
