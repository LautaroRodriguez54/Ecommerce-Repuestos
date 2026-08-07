# API TESTS - Ecommerce Repuestos

Este documento contiene los endpoints disponibles, ejemplos de requests y los principales casos de prueba del backend.

---

# Base URL

```
http://localhost:3000/api
```

---

# Productos

## Obtener todos

GET

```
/productos
```

Respuesta esperada

```
200 OK
```

---

## Obtener por ID

GET

```
/productos/{id}
```

Respuesta esperada

```
200 OK
```

Si no existe

```
404 Not Found
```

---

## Crear

POST

```
/productos
```

Body

```json
{
  "name": "Pastilla Bosch",
  "sku": "BOSCH-PF001",
  "description": "Pastillas delanteras Bosch",
  "price": 25000,
  "stock": 15,
  "image": "https://picsum.photos/500",
  "compatibleYear": 2020,
  "categoryId": "<categoryId>",
  "modelId": "<modelId>"
}
```

Respuesta

```
201 Created
```

Errores

- SKU existente → 409
- Datos inválidos → 400

---

## Actualizar

PUT

```
/productos/{id}
```

Ejemplo

```json
{
  "name": "Pastilla Bosch Premium"
}
```

Respuesta

```
200 OK
```

---

## Eliminar

DELETE

```
/productos/{id}
```

Soft Delete.

Respuesta

```
200 OK
```

---

# Categorías

## Obtener todas

GET

```
/categorias
```

---

## Obtener por ID

GET

```
/categorias/{id}
```

---

## Crear

POST

```
/categorias
```

Body

```json
{
    "name": "Frenos"
}
```

---

## Actualizar

PUT

```
/categorias/{id}
```

Body

```json
{
    "name": "Frenos Premium"
}
```

---

## Eliminar

DELETE

```
/categorias/{id}
```

Si posee productos asociados

```
409 Conflict
```

---

# Marcas

## Obtener todas

GET

```
/marcas
```

---

## Obtener por ID

GET

```
/marcas/{id}
```

---

## Crear

POST

```
/marcas
```

Body

```json
{
    "name": "Toyota"
}
```

---

## Actualizar

PUT

```
/marcas/{id}
```

Body

```json
{
    "name": "Toyota Motor"
}
```

---

## Eliminar

DELETE

```
/marcas/{id}
```

Si posee modelos asociados

```
409 Conflict
```

---

# Modelos

## Obtener todos

GET

```
/modelos
```

---

## Obtener por ID

GET

```
/modelos/{id}
```

---

## Crear

POST

```
/modelos
```

Body

```json
{
    "name": "Corolla",
    "brandId": "<brandId>"
}
```

---

## Actualizar

PUT

```
/modelos/{id}
```

Ejemplo

```json
{
    "name": "Corolla Cross"
}
```

También puede modificarse únicamente la marca

```json
{
    "brandId": "<nuevoBrandId>"
}
```

O ambos campos

```json
{
    "name": "Corolla Cross",
    "brandId": "<nuevoBrandId>"
}
```

---

## Eliminar

DELETE

```
/modelos/{id}
```

Si posee productos asociados

```
409 Conflict
```

---

# Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Reglas de negocio

## Productos

- SKU único.
- Soft Delete mediante `isActive`.
- Solo los productos activos aparecen en el catálogo público.

## Categorías

- Nombre único.
- No pueden eliminarse si poseen productos asociados.

## Marcas

- Nombre único.
- No pueden eliminarse si poseen modelos asociados.

## Modelos

- La combinación **Marca + Nombre** debe ser única.
- Dos marcas diferentes pueden tener un modelo con el mismo nombre.
- No pueden eliminarse si poseen productos asociados.

---

# Arquitectura

Todos los módulos siguen la misma estructura.

```
Request
    │
    ▼
Validator (Zod)
    │
    ▼
API Route
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

# Estado actual

-  CRUD Productos
-  CRUD Categorías
-  CRUD Marcas
-  CRUD Modelos
-  Validaciones de negocio
-  Soft Delete de productos
-  Respuestas HTTP estandarizadas
-  Schemas separados para Create y Update
-  Testing manual completado