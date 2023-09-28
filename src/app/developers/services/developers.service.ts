import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../model/developer';
import { Company } from "../../public/register/model/company";
import { Post } from '../../companies/model/post';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  BaseURL: string = 'http://localhost:8080/api/v1/developers';
  PostURL: string = 'http://localhost:8080/api/v1/posts';

  certificateUrl: string = 'http://localhost:8080/api/v1/certificates';
  studyCenterUrl: string = 'http://localhost:8080/api/v1/study-centers';
  databaseUrl: string = 'http://localhost:8080/api/v1/databases';
  frameworkUrl: string = 'http://localhost:8080/api/v1/frameworks';
  programingLanguagesUrl: string = 'http://localhost:8080/api/v1/programmingLanguages';
  projectsUrl: string = 'http://localhost:8080/api/v1/projects';
  socialNetworks = 'http://localhost:8080/api/v1/socialNetworks';


  digitalProfileUrl: string = 'http://localhost:8080/api/v1/digital_profiles';
  educationUrl: string = 'http://localhost:8080/api/v1/educations';

  urlCompany = 'http://localhost:8080/api/v1/companies';

  backURL: string = 'http://localhost:8080/api/v1/users/searchByFrameworkAndProgrammingLanguageAndDatabase';


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

  GetAllDevs(): Observable<Developer> {
    return this.http
      .get<Developer>(this.BaseURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDevsByFrameworkAndLanguageAndDatabase(framework: string, language: string, database: string): Observable<object> {

    return this.http
      .get<object>(`${this.backURL}/${framework}&${language}&${database}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDeveloperById(id: number): Observable<Developer> {
    return this.http
      .get<Developer>(`${this.BaseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  AddDev(dev: Developer): Observable<Developer> {
    return this.http
      .post<Developer>(this.BaseURL, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDevById(id: number): Observable<Developer> {
    return this.http
      .get<Developer>(`${this.BaseURL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateDev(dev: Developer): Observable<Developer> {
    return this.http
      .put<Developer>(`${this.BaseURL}/${dev.id}`, JSON.stringify(dev), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetAllPosts(): Observable<Post> {
    return this.http
      .get<Post>(this.PostURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDigitalProfileByDeveloperId(developerId: number): Observable<object> {
    return this.http
      .get<object>(`${this.digitalProfileUrl}/developer/${developerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetEducationByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.educationUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetDatabaseByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.databaseUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetFrameworkByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.frameworkUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetProgrammingLanguagesByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.programingLanguagesUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetCertificatesByEducationId(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.certificateUrl}/education/${educationId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetStudyCentersByEducationId(educationId: number): Observable<object> {
    return this.http
      .get<object>(`${this.studyCenterUrl}/education/${educationId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////social networks section /////////
  GetSocialNetworkByUserId(id: number): Observable<object> {
    return this.http
      .get<object>(this.socialNetworks + '/user/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetProjectsByDigitalProfileId(digitalProfileId: number): Observable<object> {
    return this.http
      .get<object>(`${this.projectsUrl}/digitalProfile/${digitalProfileId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  //////Messages Section /////////

  GetContacts(UserId:number): Observable<object> {
    return this.http
      .get<object>(`http://localhost:8080/api/v1/users/${UserId}/messages/LastMessageDeveloper`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  GetMessages(contactId: number, UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/messages/${contactId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  SendMessage(answer: object, contactId: number, UserId:number): Observable<object> {
    return this.http
      .post<object>(`http://localhost:8080/api/v1/users/${UserId}/messages/${contactId}`, answer, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //////Notifications Section /////////

  GetNotificationsByUserId(id:number, UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
  GetAllNotifications(UserId:number): Observable<object> {
    return this.http
      .get(`http://localhost:8080/api/v1/users/${UserId}/notifications`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }



  SendNotification(notification: object, UserId:number): Observable<object> {
    return this.http
      .post<object>(`http://localhost:8080/api/v1/users/${UserId}/notifications`, JSON.stringify(notification) , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  DeleteNotificationById(id: number, UserId: number): Observable<object> {
    return this.http
      .delete(`http://localhost:8080/api/v1/users/${UserId}/notifications/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompanyAll(): Observable<Company> {
    return this.http
      .get<Company>(`${this.urlCompany}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
