import { Observable } from 'rxjs';
import { HttpRequestOptions } from 'ts-rest-client';
import { FetchHttpService } from 'ts-rest-client-fetch';

import * as model from './model';

const baseUrl = '/api/v1/auth';

export class AuthBackend implements model.AuthApi {

   private _fetchService: FetchHttpService;

   constructor() {

      this._fetchService = new FetchHttpService();

   }


   getProfile(): Observable<model.UserProfileDTO> {

      return this._fetchService.request(

         new HttpRequestOptions(
            `${baseUrl}/profile`,
            'GET',
         )

      );

   }


   updateProfile(name?: string, surname?: string, username?: string, email?: string): Observable<void> {

      return this._fetchService.request(

         new HttpRequestOptions(
            `${baseUrl}/profile`,
            'PUT',
            { name, surname, username, email },
         )

      );

   }

}
