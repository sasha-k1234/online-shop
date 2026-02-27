import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, map } from 'rxjs';
import { SignInModel } from '../models/sign-in.model';
import { SignUpModel } from '../models/sign-up.model';
import { UserAuthModel } from '../models/user-auth.model';
import { ProfileModel } from '../models/profile.model';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currUserSource = new BehaviorSubject<UserAuthModel | null>(null);
  currentUser$ = this.currUserSource.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(model: SignInModel) {
    return this.httpClient
      .post<UserAuthModel>(environment.apiUrl + 'auth/login', model)
      .pipe(
        map((data) => {
          this.setCurrUser(data);
          return data;
        })
      );
  }

  register(model: SignUpModel) {
    return this.httpClient.post(
      environment.apiUrl + 'auth/registration',
      model
    );
  }

  logout() {
    this.setCurrUser(null);
  }

  setCurrUser(user: UserAuthModel | null) {
    this.currUserSource.next(user);
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
  }

  getUserData(username:string) {
    return this.httpClient.get<ProfileModel>(environment.apiUrl + 'user/'+ username).pipe(
      map((user) => {
        for (let i = 0; i < user.photos.length; i++) {
          user.photos[i].url = environment.apiUrl + user.photos[i].url;
        }
        user.main_photo = user.photos.find((p) => p.is_main)!;
        return user;
      })
    );
  }

  editUser(user: ProfileModel) {
    return this.httpClient.post<ProfileModel>(
      environment.apiUrl + 'user/edit',
      user
    );
  }

  addProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post<Photo>(environment.apiUrl + 'user/upload', formData)
      .pipe(
        map((photo) => {
          photo.url = environment.apiUrl + photo.url;
          return photo;
        })
      );
  }

  setFavoritePhoto(id:number){
    return this.httpClient.put(environment.apiUrl + `user/changeMainPhoto/${id}`,{});
  }
  
  deletePhoto(id:number){
    return this.httpClient.delete(environment.apiUrl + `user/photo/${id}`);
  }
}
