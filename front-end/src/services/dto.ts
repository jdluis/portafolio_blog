export type commentType = {
    text: string;
    postedBy: string;
    id: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }

  export interface ArticleType {
    id: string;
    name: string;
    upvotes: number;
    comments:[commentType];
  }
  
  