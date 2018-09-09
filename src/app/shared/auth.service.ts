import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as firebase from 'firebase';
import { Router } from '@angular/Router';
import { SelectedrecipeService } from './Selectedrecipe.Service';


@Injectable()
export class AuthService {

    token= '';

    currenthost= 'http://localhost:4201';
    // http://localhost:8080 http://192.168.99.100:58080 http://wildfly:80

    constructor (private router: Router,
                 private selservice: SelectedrecipeService,
                 private http: Http) {}

    signUpUser(email: string, name: string) {
        firebase.auth().createUserWithEmailAndPassword(email, name)
        .catch(error => console.log(error));
    }

    signInServer(email: string, name: string) {
        const headers = new Headers({
            'Content-Type': 'text/plain',
            'Accept': 'text/plain',
        });
         const acoountData = email + name;
         this.http.post(this.currenthost + '/mavenweb1-1.0-SNAPSHOT/rest/login', acoountData, {headers: headers})
                .subscribe((resp: Response) => {
                    this.token = resp.headers.get('Authorization');  // в этот момент пришёл токен
                    console.log(resp.headers.get('Authorization'));
                    if (this.token === null) {
                        console.log(this.token);
                        this.token = '';
                    }
                    if (this.token !== '') {
                    this.selservice.selectedRecipieind = undefined;
                    this.router.navigate(['/catalogue/edit']); }
                }
                );
    }

/**
    signInUser(email:string, name:string){   //аутентификация на firebase - старая
        firebase.auth().signInWithEmailAndPassword(email,name)
        .then( response=>{
            firebase.auth().currentUser.getToken()
            .then((token:string)=>{this.token=token;  // в этот момент пришёл токен
            this.selservice.selectedRecipieind=undefined;
            this.router.navigate(['/catalogue/edit']);}
            );
        } )
        .catch(error=>console.log(error))
    }
 */
    getToken() {
    //    firebase.auth().currentUser.getToken()
    //    .then((token:string)=>this.token=token)
        return this.token;
    }

    isAuthenticated() {
        return this.token !== '';
      }
     LogOut() {
    //    firebase.auth().signOut();
        this.token = '';
    }
}
