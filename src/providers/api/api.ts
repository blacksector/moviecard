import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiProvider {
  url: string = 'https://api.themoviedb.org/3';

  apiKey: string = '';

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint + '?api_key=' + this.apiKey, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint + '?api_key=' + this.apiKey, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint + '?api_key=' + this.apiKey, body, options);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint + '?api_key=' + this.apiKey, body, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint + '?api_key=' + this.apiKey, body, options);
  }
}
