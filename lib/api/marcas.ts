export async function getMarcas() {
  const response = await fetch("/api/marcas");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudieron obtener las marcas");
  }

  return result.data;
}

export async function getMarca(id: string) {
  const response = await fetch(`/api/marcas/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener la marca");
  }

  return result.data;
}

export async function createMarca(data: { name: string }) {
  const response = await fetch("/api/marcas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear la marca");
  }

  return result.data;
}

export async function updateMarca(
  id: string,
  data: { name?: string }
) {
  const response = await fetch(`/api/marcas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar la marca");
  }

  return result.data;
}

export async function deleteMarca(id: string) {
  const response = await fetch(`/api/marcas/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar la marca");
  }

  return result.data;
}