import axios from 'axios';

export class GasStationService {
  private client: any;

  private readonly url = 'https://ethgasstation.info/api/ethgasAPI.json';

  constructor(private readonly environment?: string) {
    this.client = axios.create();
  }

  public async getPrices() {
    return this.client.get(this.url);
  }

  public async getPrice(speed: string) { // speed: fast | fastest | safeLow | average
    const prices = (await this.getPrices()).data;

    return prices[speed] * 1e8;
  }

  public async getFastPrice() {
    return this.getPrice('fast');
  }
}