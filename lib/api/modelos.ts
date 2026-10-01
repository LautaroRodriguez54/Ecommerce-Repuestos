export async function getModelos() {
  const response = await fetch("/api/modelos");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudieron obtener los modelos");
  }

  return result.data;
}

export async function getModelo(id: string) {
  const response = await fetch(`/api/modelos/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener el modelo");
  }

  return result.data;
}

export async function createModelo(data: { name: string; brandId: string }) {
  const response = await fetch("/api/modelos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear el modelo");
  }

  return result.data;
}

export async function updateModelo(
  id: string,
  data: { name?: string; brandId?: string }
) {
  const response = await fetch(`/api/modelos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar el modelo");
  }

  return result.data;
}

export async function deleteModelo(id: string) {
  const response = await fetch(`/api/modelos/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar el modelo");
  }

  return result.data;
}