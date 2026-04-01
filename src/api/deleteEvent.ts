const url = "http://localhost:3000/eventos";

export async function deleteEvent(id: number) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error("Error al eliminar");
    return true;
  } catch (error) {
    console.error("Error", error);
    return false;
  }
}
