# Sistema de Gestión de Tickets de Soporte

Este proyecto contiene el frontend y un mock API para un sistema de gestión de tickets.

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (que incluye npm) en tu sistema.

## 1. Levantar el Mock API

El Mock API simula el backend del sistema utilizando `json-server`. Se ejecuta en el puerto `3001`.

1. Abre una terminal.
2. Navega al directorio del mock:
   ```bash
   cd mock-api
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

## 2. Levantar el Frontend

El frontend está construido con [React](https://react.dev/) y [Vite](https://vitejs.dev/).

1. Abre una **nueva** terminal (manteniendo el Mock API corriendo en la anterior).
2. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El servidor de Vite te indicará en la terminal la URL local donde puedes acceder a la aplicación (usualmente `http://localhost:5173`).

# Preguntas Conceptuales

1. **¿Qué es un input controlado en React? Muestra con un fragmento de tu propio código cómo lo implementaste en el formulario.**

Un input controlado es aquel cuyo valor no lo maneja el navegador, sino React a través del "estado". Básicamente, el input siempre muestra lo que diga una variable de estado, y cada vez que el usuario escribe, se usa una función para actualizar esa variable.

**Fragmento de nuestro código (`TicketForm.jsx`):**

```jsx
// 1. Definimos el estado inicial
const [form, setForm] = useState({
  nombre: "",
  descripcion: "",
  estado: "abierto",
});

// 2. El input se vincula al estado
<input
  type="text"
  value={form.nombre} // El valor sale del estado
  onChange={(e) => setForm({ ...form, nombre: e.target.value })} // Actualizamos el estado al escribir
/>;
```

2. **El filtro por estado funciona en el cliente sin volver a llamar la API. ¿En qué momento esa decisión dejaría de ser la correcta? ¿Cuándo conviene delegar el filtro al servidor?**

Dejaría de ser correcto si la aplicación llega a tener muchísima información (por ejemplo, 10,000 tickets). Si intentamos traer todos esos datos de una vez para filtrarlos en el navegador, la página se pondría muy lenta o se podría trabar.

Conviene delegar el filtro al servidor cuando hay grandes cantidades de datos. Así, el servidor hace el trabajo pesado y solo le envía al frontend los poquitos resultados que el usuario realmente pidió ver.

3. **Si además del listado de tickets necesitaras mostrar un contador global de tickets abiertos en el header, sin usar Context ni Redux, ¿cómo organizarías el estado y los props para lograrlo?**

Lo organizaría usando algo llamado "elevación de estado". Como el Header y la Lista son componentes diferentes, pondría el estado de los tickets en el componente padre que los contiene a ambos.

De esta forma, desde el componente padre puedo pasarle la lista completa a la sección de tickets y, al mismo tiempo, pasarle solo el número total o el conteo al Header a través de las props. Así ambos componentes están sincronizados sin complicar el código.
