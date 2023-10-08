# Proyecto 01: Web Service para Consulta de Clima en Aeropuertos

_Universidad Nacional Autónoma de México_  
_Facultad de Ciencias_  
_Modelado y Programación_  
_Fecha:_ 29 de Agosto de 2023

## Integrantes

- _David Rivera Morales_ - 320176876
- _Jorge Eduardo García Serrano_ - 320180918

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

### 2.1 Descripción del algortimo para la consulta del clima

1. El usuario selecciona la opción de búsqueda por ciudades o boleto.
2. El usuario ingresa las ciudades de salida y llegada o el código del boleto.
3. El sistema valida la entrada del usuario y muestra un mensaje de error en caso de ser necesario.
4. El sistema realiza una consulta al web service para obtener el clima de las ciudades de salida y llegada donde estas se guardan en un cache.
5. El sistema muestra el clima de las ciudades de salida y llegada pero si hay un error en la consulta, se muestra un mensaje de error.
6. El usuario puede realizar otra consulta.

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

4. **Sustituye la API Key**:
   En el archivo `.env`, sustituye el valor de la variable `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY` con tu API Key de OpenWeatherMap.

5. **Iniciar la aplicación**:

   ```bash
   npm run dev
   ```

   O si usa Yarn:

   ```bash
   yarn dev
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

- En el folder `app` se encuentran los archivos de la aplicación, mientras que en el folder `cypress` se encuentran los archivos de las pruebas y en el folder `public` se encuentran los archivos públicos de la aplicación.

- Dentro de `app` se encuentran los siguientes folders:
  `components`: contiene los componentes de la aplicación.
  `services`: contiene los servicios de la aplicación.
- Dentro de `cypress` se encuentran los siguientes folders:
  `fixtures`: contiene los archivos de datos para las pruebas.
  `integration`: contiene las pruebas de integración.
  `support`: contiene los archivos de configuración de Cypress.
  `e2e`: contiene las pruebas de extremo a extremo.
- Dentro de `public` se encuentran los siguientes folders que contienen los archivos públicos de la aplicación ( esto ya que Next.js lo requiere así de acuerdo a su documentación):
  `data`: contiene los archivos de datos públicos de la aplicación.

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

## 6. Mantenimiento

El mantenimiento de la aplicación a largo plazo principalmente será el seguir con la actualización de las librerías y dependencias utilizadas, así como la corrección de errores y la implementación de nuevas funcionalidades.
La actualización de las librerías y dependencias se soluciona con un dependabot que se encargue de actualizar las versiones de las librerías y dependencias utilizadas conforme vayan saliendo nuevas versiones.
Para la corrección de errores, se deberá de estar al pendiente de los errores que se reporten y corregirlos lo más pronto posible.
Para la parte de las pruebas, se deberán actualizar las pruebas existentes y agregar nuevas pruebas para las nuevas funcionalidades.

## 8. ¿Por qué este tech stack?

Para este proyecto se decidió utilizar el stack de Next.js, React y Tailwind CSS. A continuación se presentan las razones de esta decisión.

- Mejor experiencia de usuario: Next.js permite crear aplicaciones web con React de forma rápida y sencilla, además de que permite el renderizado del lado del servidor, lo que mejora la experiencia de usuario.
- Portabilididad y escalabilidad: Next.js permite crear aplicaciones web portables y escalables, lo que permite que la aplicación pueda crecer y adaptarse a las necesidades de los usuarios.
- Estilos personalizados y reutilizables: Tailwind CSS permite crear estilos personalizados y reutilizables, lo que permite que la aplicación tenga un diseño único y atractivo.
- Pruebas de extremo a extremo: Cypress permite realizar pruebas de extremo a extremo, lo que permite probar la aplicación como un usuario real mientras otras tecnologías como Jest solo permiten probar componentes de forma aislada.
