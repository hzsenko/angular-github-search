import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {
  repoTypes: { [key: string]: string };

  constructor() {
    this.repoTypes = {
      private: 'Приватные',
      public: 'Публичные',
      all: 'Все',
    };
  }
}
