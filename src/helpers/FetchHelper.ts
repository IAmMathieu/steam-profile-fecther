import { FetchArgs } from '../types/Types';

export default async function fetchData<T>(args: FetchArgs): Promise<T> {
  const { url, ...rest } = args;
  const fetchedData = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  return fetchedData.json();
}
