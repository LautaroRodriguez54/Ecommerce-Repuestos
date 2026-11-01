export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: "Producto no encontrado.",
  PRODUCT_ALREADY_EXISTS: "Ya existe un producto con ese SKU.",
  PRODUCT_INACTIVE: "El producto está inactivo.",
  PRODUCT_OUT_OF_STOCK: "El producto no tiene stock disponible.",

  MODEL_NOT_FOUND: "El modelo no existe.",
  MODEL_ALREADY_EXISTS: "El modelo ya existe.",
  MODEL_HAS_PRODUCTS:
    "No se puede eliminar el modelo porque tiene productos asociados.",

  USER_NOT_FOUND: "Usuario no encontrado.",
  USER_ALREADY_EXISTS: "El usuario ya existe.",

  CATEGORY_ALREADY_EXISTS: "La categoría ya existe.",
  CATEGORY_NOT_FOUND: "Categoría no encontrada.",
  CATEGORY_HAS_PRODUCTS:
    "No se puede eliminar la categoría porque tiene productos asociados.",

  BRAND_NOT_FOUND: "La marca no existe.",
  BRAND_ALREADY_EXISTS: "La marca ya existe.",
  BRAND_HAS_MODELS:
    "No se puede eliminar la marca porque tiene modelos asociados.",

  INVALID_CREDENTIALS: "Email o contraseña incorrectos.",
  USER_INACTIVE: "El usuario está inactivo.",

  CART_ITEM_NOT_FOUND: "El producto no se encuentra en el carrito.",
} as const;