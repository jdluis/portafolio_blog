export interface Article {
  id: string;
  name: string;
  upvotes: string;
  comments?:[commentType];
}

export type commentType = {
  text: string;
  postedBy: string;
}

const API_URL = "http://localhost:5173/api";

// Obtener todos los artículos
const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) {
      throw new Error(
        `Error fetching articles: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Obtener un artículo por ID
const getArticleByName = async (name: string): Promise<Article | undefined> => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/articles/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Article not found");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => console.error("Error fetching article:", error));
  });
};

export { getArticles, getArticleByName };
