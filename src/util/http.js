export async function fetchAvailableMeals() {
  const res = await fetch("http://localhost:3000/meals");
  if (!res.ok) {
    throw new Error("Failed to fetch available places");
  }
  const data = await res.json();
  return data;
}
