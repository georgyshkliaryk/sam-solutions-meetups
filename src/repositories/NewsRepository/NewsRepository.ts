import {
  IEditedArticleToServer,
  INewsFromServer,
  INewsToServer,
} from "./../interfaces/INetworkRepository";
import {
  IEditedArticle,
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

  async editArticle(id: string, articleData: IEditedArticle): Promise<void> {
    const editedArticle = this.parseEditedArticleForServer(articleData);
    await this.networkRepository.editArticle(id, editedArticle);
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

  private parseEditedArticleForServer(
    article: IEditedArticle
  ): IEditedArticleToServer {
    return {
      id: article.id,
      title: article.title,
      text: article.description,
      image: article.image,
    };
  }
}
