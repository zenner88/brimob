import { Injectable } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class GlobalService {
  
  constructor(private tokenStorage: TokenStorageService) { }

  public readonly levelUser = this.tokenStorage.getUser().level_user;
  public readonly polda = this.tokenStorage.getUser().polda;
  public readonly satwil = this.tokenStorage.getUser().satwil;
  public readonly token = this.tokenStorage.getUser().token;
  public readonly body = {      
    "level_user" : this.levelUser,
    "polda" : this.polda,
    "satwil" : this.satwil,
    "start" : 1,
    "limit" : 1000
  };
  public readonly header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  public readonly headers = { headers: this.header };

  public readonly address: string = 'http://202.67.10.238:5000';  
  public readonly workorder: string = '/datatable';  
  public readonly login: string = '/login_user';  
  public readonly simpanUser: string = '/simpan_user';  
}