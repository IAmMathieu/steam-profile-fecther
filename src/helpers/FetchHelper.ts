export default async function fetchData<T>(url: string, id: T): Promise<T> {
  const fetchedData = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_steam_id: id }),
  });

  const data: T = await fetchedData.json();

  return data;
}