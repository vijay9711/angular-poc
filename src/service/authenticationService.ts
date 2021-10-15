import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
    providedIn:'root'
})
export class AunthenticationService{
    private REST_API_SERVER = environment.baseUrl;
    constructor(private httClient:HttpClient){};

    public addUser(data: any){
        let url = this.REST_API_SERVER + `/api/user`;
        return this.httClient.post(url, data);
    }
    public login(data: any){
        let url = this.REST_API_SERVER + `/api/user-auth`;
        return this.httClient.post(url, data);
    }
}