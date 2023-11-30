export async function fetchFakeFood(q: string) {
  const res = await fetch(`https://api.frontendeval.com/fake/food/${q}`);
  return res.json();
}