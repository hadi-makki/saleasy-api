import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkService {
  async createLink() {
    return 'This action adds a new link';
  }
}
