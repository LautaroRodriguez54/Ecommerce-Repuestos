# Arquitectura del Backend

## Objetivo

El backend sigue una arquitectura en capas para separar responsabilidades, facilitar el mantenimiento y permitir escalar el proyecto sin duplicar lógica.

---

# Estructura del proyecto

```
app/
├── api/
│   ├── productos/
│   ├── categorias/
│   ├── marcas/
│   ├── modelos/
│   └── ...
│
repositories/
│
services/
│
validators/
│
utils/
│
lib/
│
constants/
│
types/
```

Cada carpeta tiene una única responsabilidad.

---

# Flujo de una Request

```
Cliente
    │
    ▼
API Route
    │
    ▼
Validator (Zod)
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

---

# Responsabilidad de cada capa

## API Routes

Ubicación

```
app/api/*
```

Responsabilidades

- Recibir requests HTTP.
- Validar datos con Zod.
- Llamar al Service correspondiente.
- Traducir errores a respuestas HTTP.
- Nunca acceder directamente a Prisma.

Ejemplo

```ts
const validation = createProductSchema.safeParse(body);

if (!validation.success) {
    return badRequest(validation.error.issues[0].message);
}

const product = await createProduct(validation.data);

return created(product);
```

---

## Validators

Ubicación

```
validators/
```

Responsabilidades

- Validar datos de entrada.
- No acceder a la base de datos.
- No contener reglas de negocio.

Cada entidad posee:

```
entitySchema
createEntitySchema
updateEntitySchema
```

y sus tipos:

```
EntityInput
CreateEntityInput
UpdateEntityInput
```

---

## Services

Ubicación

```
services/
```

Responsabilidades

- Contener toda la lógica de negocio.
- Validar reglas entre entidades.
- Lanzar errores de negocio.
- Nunca responder HTTP.
- Nunca conocer Request o Response.

Ejemplos

- SKU único.
- Marca existente.
- Modelo existente.
- No eliminar categorías con productos.

---

## Repository

Ubicación

```
repositories/
```

Responsabilidades

- Comunicarse con Prisma.
- Ejecutar consultas.
- No implementar reglas de negocio.

Debe ser una capa "tonta".

Ejemplo

```ts
findProductById(id)
createProduct(data)
updateProduct(id, data)
deleteProduct(id)
```

---

## Prisma

Ubicación

```
lib/prisma.ts
```

Responsabilidad

Mantener una única instancia de Prisma Client.

---

# Reglas del proyecto

## Nunca

❌ Route → Prisma

```
Route
   ↓
 Prisma
```

---

## Siempre

✅

```
Route

↓

Service

↓

Repository

↓

Prisma
```

---

## Nunca

Escribir mensajes de error manualmente.

Incorrecto

```ts
throw new Error("Producto no encontrado");
```

Correcto

```ts
throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
```

---

## Nunca

Duplicar validaciones.

Incorrecto

Validar el mismo campo en Route y Service.

---

## Siempre

Route

↓

Validación de formato

↓

Service

↓

Validación de negocio

---

# Convenciones

## POST

Utiliza

```
createEntitySchema
```

---

## PUT

Utiliza

```
updateEntitySchema
```

---

## DELETE

Devuelve

```
200 OK
```

o

```
409 Conflict
```

cuando exista una regla de negocio.

---

# Respuestas HTTP

Todas las respuestas utilizan

```
utils/apiResponse.ts
```

Funciones disponibles

```
success()
created()
badRequest()
notFound()
conflict()
serverError()
```

No se utiliza

```ts
NextResponse.json(...)
```

directamente.

---

# Soft Delete

Actualmente

Producto

```
isActive = false
```

No se eliminan físicamente registros utilizados por el catálogo.

---

# Relaciones

Brand

↓

Model

↓

Product

↓

Category

```
Brand
    │
    └── Model
             │
             └── Product
                       │
                       └── Category
```

---

# Reglas de negocio

## Productos

- SKU único.
- Soft Delete.
- Solo productos activos para catálogo.

## Categorías

- Nombre único.
- No eliminar con productos.

## Marcas

- Nombre único.
- No eliminar con modelos.

## Modelos

- Nombre único dentro de una misma marca.
- Permitido repetir nombre en marcas distintas.
- No eliminar con productos.

---

# Agregar una nueva entidad

Checklist

- Crear modelo en Prisma.
- Ejecutar migración.
- Crear Validator.
- Crear Repository.
- Crear Service.
- Crear API Routes.
- Agregar mensajes en `constants/messages.ts`.
- Agregar pruebas en `API_TESTS.md`.
- Ejecutar:

```
npx tsc --noEmit
```

- Probar CRUD completo.

---

# Estado actual

## Catálogo

 Productos

 Categorías

 Marcas

 Modelos

---

# Próximos módulos

- Usuarios
- Autenticación
- Carrito
- Checkout
- Órdenes
- Dashboard Administrativo