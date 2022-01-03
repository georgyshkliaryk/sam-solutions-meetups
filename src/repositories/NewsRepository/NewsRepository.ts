import { INewsFromServer } from "../interfaces/INetworkRepository";
import { INews, INewsRepository } from "../interfaces/INewsRepository";
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

  private parseNews(news: INewsFromServer): INews {
    return {
      id: news.id,
      date: news.publicationDate,
      title: news.title,
      description: news.text,
      image: news.image,
    };
  }
}
