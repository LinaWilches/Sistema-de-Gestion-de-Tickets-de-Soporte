# Mock API — Modelo A · Tickets de Soporte

## Requisitos
- Node.js instalado

## Instalación y ejecución
```bash
npm install
npm start
```
La API queda disponible en: **http://localhost:3001**

## Recurso: /tickets

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| nombre | string | Sí | Nombre del cliente |
| descripcion | string | Sí | Detalle del problema |
| estado | string | Sí | abierto \| en_progreso \| cerrado |
| fecha | string | No | YYYY-MM-DD |

## Endpoints
| Método | URL | Descripción |
|---|---|---|
| GET | /tickets | Lista todos los tickets |
| GET | /tickets/:id | Obtiene un ticket por ID |
| POST | /tickets | Crea un nuevo ticket |
| PUT | /tickets/:id | Actualiza un ticket |

## Ejemplo POST
```json
{
  "nombre": "Ana Torres",
  "descripcion": "Problema con la señal de TV",
  "estado": "abierto",
  "fecha": "2025-04-24"
}
```
