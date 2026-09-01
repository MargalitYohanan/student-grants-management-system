import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGrantRequest, CreateGrantResponse, GrantRequestDetail, GrantRequestSummary, MyStatusResponse, RequestFilters, RequestStatus, UpdateStatusResponse } from '../class/request';

@Injectable({
  providedIn: 'root',
})
export class Request {

  private apiUrl = 'http://localhost:3000/api/request';

  constructor(private http: HttpClient) { }

  createRequest(req: CreateGrantRequest): Observable<CreateGrantResponse> {
    return this.http.post<CreateGrantResponse>(this.apiUrl, req);
  }

  getMyStatus(): Observable<MyStatusResponse> {
    return this.http.get<MyStatusResponse>(`${this.apiUrl}/status`);
  }

  getRequests(filters: RequestFilters): Observable<GrantRequestSummary[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<GrantRequestSummary[]>(`${this.apiUrl}/admin/all`, { params });
  }

  getRequestDetails(id: string): Observable<GrantRequestDetail> {
    return this.http.get<GrantRequestDetail>(`${this.apiUrl}/admin/request/${id}`);
  }

  updateRequestStatus(id: string, status: RequestStatus): Observable<UpdateStatusResponse> {
    return this.http.patch<UpdateStatusResponse>(`${this.apiUrl}/admin/${id}/status`, { status });
  }
}
