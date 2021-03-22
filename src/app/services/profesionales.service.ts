import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/companies';
  }

  getAll(): Promise<Company[]> {
    const httpOptions = { headers: new HttpHeaders() };

    return this.httpClient
      .get<Company[]>(this.baseUrl, httpOptions)
      .toPromise();
  }

  /* getCompanyDetailByJobOffer(pId): Promise<Company> {
    const httpOptions = { headers: new HttpHeaders() };
    return this.httpClient.get<Company>(`${this.baseUrl}/${pId}`, httpOptions).toPromise();

  } */

  create(formValues): Promise<Company> {
    return this.httpClient.post<Company>(this.baseUrl, formValues).toPromise();
  }

  update(data): Promise<any> {
    return this.httpClient
      .put<any>(`${this.baseUrl}`, data, this.createHeaders())
      .toPromise();
  }

  createHeaders(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'authorization': localStorage.getItem('token_gym')
      }),
    };
  }
}
