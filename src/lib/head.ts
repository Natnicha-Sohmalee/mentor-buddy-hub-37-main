export function pageHead(title: string, description: string) {
  const full = `${title} | Trainee Hub`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
    ],
  };
}
