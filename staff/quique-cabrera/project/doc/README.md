# sesiona - App

## Intro

Sesiona está diseñada para facilitar la contratación eficiente de fotógrafos, optimizando la gestión de la disponibilidad de los profesionales y la accesibilidad de los clientes. A través de un algoritmo de asignación dinámica, el sistema coordina de manera automática las solicitudes de los usuarios, garantizando que se asignen los fotógrafos más adecuados en función de la disponibilidad y las preferencias del cliente.

![Calendar](https://media.giphy.com/media/bIQP1URyq1joCjFUWt/giphy.gif?cid=ecf05e47y7acbkkz6p68ld2v4r57itdsufp1mmsk5aycawkf&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Funcional
Incorpora una interfaz intuitiva que permite realizar reservas de manera ágil y sin fricciones, mientras que un sistema de gestión de datos en tiempo real asegura la actualización constante de la disponibilidad. Además, el sistema integra protocolos de comunicación para la interacción eficiente entre clientes y fotógrafos, mejorando la experiencia general y reduciendo los tiempos de espera.

La arquitectura del sistema está diseñada para escalar de forma flexible, permitiendo una fácil incorporación de nuevos usuarios y fotógrafos, mientras mantiene altos niveles de rendimiento y eficiencia.

### Use Cases

Customer (User)
- search sesion (set day, set hour, set geo,...)
- add session
- remove sesion
- checkout cart (create order)
- view order
- view orders history
- add profile (phone, email, geo,...)
- edit profile

Photographer (User)
- add services
- remove services
- add profile (phone, email, geo,...)
- edit profile

### UXUI Design

[Figma](https://www.figma.com/proto/ec0DHZy7CKIwtIT6DcUVBP/emestudi?node-id=41-24&p=f&t=vtZ00tAQg8mohWsz-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=37%3A27)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app 
- api
- com
- doc (documentation)

### Techs
- HTML/CSS/JS
- React
- Node/Express
- ...

### Data Model
User
- id (uuid)
- name (string)
- email (string)
- phone (string)
- address (string)
- role (Photographer, Customer, Admin)
- geo

### Coverage
![Code Coverage](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=2486)

## Tasks

[GitHub](https://github.com/b00tc4mp/isdi-parttime-202410/issues/44)