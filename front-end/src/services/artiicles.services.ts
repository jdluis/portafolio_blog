export interface Article {
  id: string;
  title: string;
  description: string;
}

const data = {
  posts: [
    {
      id: "1",
      title: "JavaScript Basics",
      description:
        "Learn the fundamentals of JavaScript, the programming language of the web.",
    },
    {
      id: "2",
      title: "Python for Data Science",
      description:
        "Discover how to use Python for data analysis and visualization.",
    },
    {
      id: "3",
      title: "backend development",
      description:
        "Learn how to build robust backend systems using Node.js and Express.",
    },
    {
      id: "4",
      title: "Patterns design",
      description:
        "Explore design patterns and best practices for software development.",
    },
    {
      id: "5",
      title: "Css Flexbox",
      description: "Master CSS Flexbox for responsive web design.",
    },
  ],
};

// Simula la base de datos en memoria
const articles = data.posts as Article[];

// Obtener todos los artículos
const getArticles = async (): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(articles);
    }, 500); // Simula un retraso de 500ms
  });
};

// Obtener un artículo por ID
const getArticleById = async (id: string): Promise<Article | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = articles.find((article) => article.id === id);
      resolve(article);
    }, 500); // Simula un retraso de 500ms
  });
};

// Crear un nuevo artículo
const createArticle = async (article: Article): Promise<Article> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      articles.push(article);
      resolve(article);
    }, 500); // Simula un retraso de 500ms
  });
};

export { getArticles, getArticleById, createArticle };
