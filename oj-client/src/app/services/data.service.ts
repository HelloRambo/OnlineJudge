import { Injectable } from '@angular/core';
import {Problem} from '../models/problem.model';
import { PROBLEMS } from '../mock-problem';
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {

  private problemsSoure = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    this.http.get('api/v1/problems')
      .toPromise()
      .then((res: Response) => {
        this.problemsSoure.next(res.json());
      })
      .catch(this.handleError);

    return this.problemsSoure.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    let headers = new Headers({ 'content-type': 'application/json'});
    return this.http.post('/api/v1/problems', problem, headers)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<Object> {
    let headers = new Headers({ 'content-type': 'application/json'});
    return this.http.post('/api/v1/build_and_run', data, headers)
      .toPromise()
      .then((res: Response) => {
        console.log('data.service',res.json());
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
