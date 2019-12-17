import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EstoqueModel } from "../models/estoque.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EstoqueService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  apiUrl = "http://localhost:62981/api/estoque";

  constructor(private http: HttpClient) {}

  get() {
    //return this.http.get<EstoqueModel[]>("./assets/mocks/estoque-list.json");

    return this.http.get<EstoqueModel[]>(this.apiUrl);
  }

  getById(id: number) {
    //return this.http.get<EstoqueModel[]>("./assets/mocks/estoque-list.json");

    return this.http.get<EstoqueModel>(`${this.apiUrl}/${id}`);
  }

  post(entity: EstoqueModel) {
    // return of(true).pipe(tap(() => this.get()));

    return this.http
      .post<EstoqueModel>(this.apiUrl, entity, this.httpOptions)
      .pipe(tap(() => this.get()));
  }

  put(entity: EstoqueModel, id: number) {
    // return of(true).pipe(tap(() => this.get()));

    return this.http
      .put<EstoqueModel>(`${this.apiUrl}?id=${id}`, entity, this.httpOptions)
      .pipe(tap(() => this.get()));
  }

  delete(id: number) {
    // return of(true).pipe(tap(() => this.get()));

    return this.http
      .delete<EstoqueModel>(`${this.apiUrl}?id=${id}`)
      .pipe(tap(() => this.get()));
  }
}
