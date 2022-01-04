import { INewsToServer } from "./../interfaces/INetworkRepository";
import { INewsFromServer } from "../interfaces/INetworkRepository";
import {
  INewArticle,
  INews,
  INewsRepository,
} from "../interfaces/INewsRepository";
import { NetworkRepository } from "../NetworkRepository/NetworkRepository";

export class NewsRepository implements INewsRepository {
  constructor(private readonly networkRepository: NetworkRepository) {
    this.networkRepository = networkRepository;
  }

  async getAllNews(): Promise<INews[]> {
    const newsFromServer = await this.networkRepository.getAllNews();
    return newsFromServer.map(this.parseNews);
  }

  async getArticleById(id: string): Promise<INews> {
    const articleFromServer = await this.networkRepository.getArticleById(id);
    return this.parseNews(articleFromServer);
  }

  async createArticle(articleData: INewArticle): Promise<INews> {
    const newArticleForServer = this.parseArticleForServer(articleData);
    const response = await this.networkRepository.createArticle(
      newArticleForServer
    );
    return this.parseNews(response);
  }

  private parseNews(news: INewsFromServer): INews {
    return {
      id: news.id,
      date: news.publicationDate,
      title: news.title,
      description: news.text,
      image: news.image,
    };
  }

  private parseArticleForServer(article: INewArticle): INewsToServer {
    return {
      title: article.title,
      text: article.description,
      publicationDate: article.date,
      image: article.image,
    };
  }
}
