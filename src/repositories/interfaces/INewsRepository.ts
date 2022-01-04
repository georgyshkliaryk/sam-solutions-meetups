export interface INews {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface INewArticle {
  title: string;
  description: string;
  date: string;
  image: string | null;
}

export interface INewsRepository {
  getAllNews: () => Promise<INews[]>;
  getArticleById: (id: string) => Promise<INews>;
}
