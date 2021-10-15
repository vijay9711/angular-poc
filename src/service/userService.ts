import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private REST_API_SERVER = environment.baseUrl;
    constructor(private httClient:HttpClient){};

    public getAllUser(){
        let url = this.REST_API_SERVER + `/api/users`;
        return this.httClient.get(url);
    }
}