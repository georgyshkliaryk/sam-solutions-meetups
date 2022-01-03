export interface INews {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface INewsRepository {
  getAllNews: () => Promise<INews[]>;
  getArticleById: (id: string) => Promise<INews>;
}
