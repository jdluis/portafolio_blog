import { ArticleType, commentType } from "./dto";

const API_URL = "/api";

const getArticles = async (): Promise<ArticleType[]> => {
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

const getArticleByName = async (name: string): Promise<ArticleType | undefined> => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/article/${name}`)
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

const upvoteArticle = async (
  name: string,
  headersAuth: { headers: { authtoken: string } } | object
): Promise<number> => {
  try {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...headersAuth
    };

    const response = await fetch(`${API_URL}/article/${name}/upvote`, requestOptions);

    if (!response.ok) {
      throw new Error(`Error upvoting article: ${response.status} ${response.statusText}`);
    }

    const updatedArticleData = await response.json();
    return updatedArticleData.upvotes;
  } catch (error) {
    console.error("Error upvoting article:", error);
    throw error;
  }
};

const addCommentToArticle = async (
  name: string,
  nameText: string,
  commentText: string,
  headersAuth: { authtoken: string } | object
): Promise<commentType[]> => {
  try {
    const response = await fetch(`${API_URL}/article/${name}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...headersAuth,
      body: JSON.stringify({
        postedBy: nameText,
        text: commentText,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Error adding comment: ${response.status} ${response.statusText}`
      );
    }

    const updatedArticleData = await response.json();
    return updatedArticleData.comments;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export { getArticles, getArticleByName, upvoteArticle, addCommentToArticle };
