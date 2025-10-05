export async function fetchCompanies(signal) {
  const res = await fetch('/companies.json', { signal });
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}
