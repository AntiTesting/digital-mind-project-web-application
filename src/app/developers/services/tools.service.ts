import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Developer } from '../model/developer';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  //Developer tools
  projectsUrl: string = 'http://localhost:8080/api/v1/projects';
  educationUrl: string = 'http://localhost:8080/api/v1/educations';
  digitalProfileUrl: string = 'http://localhost:8080/api/v1/digital_profiles';
  databaseUrl: string = 'http://localhost:8080/api/v1/databases';
  frameWorkUrl: string = 'http://localhost:8080/api/v1/frameworks';
  programingLanguageUrl: string = 'http://localhost:8080/api/v1/programmingLanguages';
  certificateUrl: string = 'http://localhost:8080/api/v1/certificates';
  studyCenterUrl: string = 'http://localhost:8080/api/v1/study-centers';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient) { }

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
// Get Framework by developer id
    GetFrameworkByDevId(id: number): Observable<object> {
      return this.http
        .get(`${this.frameWorkUrl}/developer/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }
// Get Database by digital profile id
    GetDatabaseByDevId(id: number): Observable<object> {
      return this.http
        .get(`${this.databaseUrl}/developer/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }
// Get Programming Language by digital profile id
    GetProgrammingLanguageByDevId(id: number): Observable<object> {
      return this.http
        .get(`${this.programingLanguageUrl}/developer/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }
////// Delopersd Tools///////
  // create a new project with especific digital profile
  createProject(project: object, digitalProfileId: number): Observable<object> {
    return this.http
      .post(`${this.projectsUrl}/digitalProfile/${digitalProfileId}`, project, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

 // create a new database with especific digital profile
    createDatabase(database: object, digitalProfileId: number): Observable<object> {
      return this.http
        .post(`${this.databaseUrl}/${digitalProfileId}`, database, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));  
    }

  //create a new framework with especific digital profile
    createFramework(framework: object, digitalProfileId: number): Observable<object> {
      return this.http
        .post(`${this.frameWorkUrl}/${digitalProfileId}`, framework, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }

  //create a new programming language with especific digital profile
   
    createProgrammingLanguage(programmingLanguage: object, digitalProfileId: number): Observable<object> {
      return this.http
        .post(`${this.programingLanguageUrl}/${digitalProfileId}`, programmingLanguage, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }

    //create a new certificate with especific education id
    createCertificate(certificate: object, educationId: number): Observable<object> {
      return this.http
        .post(`${this.certificateUrl}/education/${educationId}`, certificate, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }

    //Get Education by digital profile id
    GetEducationByDigitalProfileId(id: number): Observable<object> {
      return this.http
        .get(`${this.educationUrl}/digitalProfile/${id}`, this.httpOptions) 
        .pipe(retry(2), catchError(this.handleError));
    }
   
    //create study center with especific education id
    createStudyCenter(studyCenter: object, educationId: number): Observable<object> {
      return this.http
        .post(`${this.studyCenterUrl}/${educationId}`, studyCenter, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }

    //Get Digital Profile by developer id
    GetDigitalProfileByDevId(id: number): Observable<object> {
      return this.http
        .get(`${this.digitalProfileUrl}/developer/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
    }




}
