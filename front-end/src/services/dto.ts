export type commentType = {
    text: string;
    postedBy: string;
    id: string;
  }
  
  export interface User {
    id: string;
    title: string;
    email: string;
    createdAt: string;
  }

  export interface ArticleType {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    comments:[commentType];
  }
  
  