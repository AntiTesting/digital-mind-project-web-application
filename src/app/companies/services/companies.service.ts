import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Company } from '../model/company';
import {Developer} from "../../public/register/model/developer";
import { Post } from '../model/post';



@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  BaseURL: string = 'http://localhost:8080/api/v1/companies';

  socialNetworks = 'http://localhost:8080/api/v1/socialNetworks';

  basePath = 'http://localhost:8080/api/v1/users';

  urlDeveloper = 'http://localhost:8080/api/v1/developers';
  urlPost = 'http://localhost:8080/api/v1/posts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'something happened with request, please try again later'
    );
  }



  GetPostById(id: number): Observable<Post> {
    return this.http
      .get<Post>(this.urlPost + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetPostsByUserId(id: number): Observable<object> {
    return this.http
      .get<object>(this.urlPost + '/company/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddPost(post: Post, id: number): Observable<Post> {
    return this.http
      .post<Post>(`${this.urlPost}/${id}`, JSON.stringify(post), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  DeletePostById(id: number) {
    return this.http.delete(`${this.urlPost}/${id}` , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllRec(): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  GetRecById(id: number): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateRec(id: number, dev: Company): Observable<Company> {
    return this.http
      .put<Company>(this.BaseURL + '/' + id, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddRec(dev: Company): Observable<Company> {
    return this.http
      .post<Company>(this.BaseURL, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetRecruiterById(id: number): Observable<Company> {
    return this.http
      .get<Company>(this.BaseURL + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Messages Section /////////

  GetContacts(UserId:number): Observable<object> {
    return this.http
      .get<object>(`http://localhost:8080/api/v1/users/${UserId}/messages/LastMessageCompany`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object, contactId:number, UserId:number): Observable<object> {
    return this.http
      .post<object>(`http://localhost:8080/api/v1/users/${UserId}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  GetSocialNetworks(companyId: number): Observable<object> {
    return this.http
      .get<object>(`${this.BaseURL}/${companyId}/company-social-networks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////social networks section /////////
  GetSocialNetworkByUserId(id: number): Observable<object> {
    return this.http
      .get<object>(this.socialNetworks + '/user/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Notifications Section /////////

  GetNotificationByUserId(id:number, UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  SendNotification(notification: object, contactId: number, UserId:number, ): Observable<object> {
    return this.http
      .post<object>(`http://localhost:8080/api/v1/users/${UserId}/notifications/${contactId}`, JSON.stringify(notification) , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  DeleteNotificationById(id: number, UserId: number): Observable<object> {
    return this.http
      .delete(`http://localhost:8080/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllUsers(): Observable<object> {
    return this.http
      .get(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddUser(user: Company): Observable<Company> {
    return this.http
      .post<Company>(this.basePath, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getDeveloperAll(): Observable<Developer> {
    return this.http
      .get<Developer>(`${this.urlDeveloper}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllNotifications(UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/notifications`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}

