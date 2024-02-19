import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BackendProviderService {
  apiRoot = "http://localhost:8000";
  constructor() {}
}
