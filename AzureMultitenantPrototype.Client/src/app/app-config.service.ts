import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppConfigService {

  private config: any = null;
  private http: HttpClient;

  constructor(private httpHandler: HttpBackend) {
    this.http = new HttpClient(httpHandler);
  }

    public getConfig(key: any) {
      return this.config[key];
    }


    load() :Promise<any>  {

      const promise = this.http.get(environment.API_URL + 'api/config/spa')
        .toPromise()
        .then(data => {
          this.config = data;
        });

      return promise;
  }
}
