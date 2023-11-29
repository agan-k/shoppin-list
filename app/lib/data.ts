export async function fetchFakeFood() {
  const res = await fetch('https://api.frontendeval.com/fake/food/ba');
  return res.json();
}