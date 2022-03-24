import { Injectable } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class GlobalService {
  
  constructor(private tokenStorage: TokenStorageService) { }

  public readonly levelUser = this.tokenStorage.getUser().level_user;
  public readonly token = this.tokenStorage.getUser().token;
  public readonly regionId = this.tokenStorage.getUser().region_id;
  public readonly regionName = this.tokenStorage.getUser().region_name;
  public readonly departmentId = this.tokenStorage.getUser().department_id;
  public readonly departmentName = this.tokenStorage.getUser().department_name;
  public readonly positionId = this.tokenStorage.getUser().position_id;
  public readonly positionName = this.tokenStorage.getUser().position_name;
  public readonly valid = this.tokenStorage.getUser().valid;
  public readonly body = {      
    "level_user" : this.levelUser,
    "position_id" : this.departmentId,
    "start" : 1,
    "limit" : 1000
  };
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  public readonly headers = { headers: this.header };

  public readonly address: string = 'http://202.67.10.238:5000/cc';  
  public readonly workorder: string = '/workorder';  
  public readonly login: string = '/login_user';  
  public readonly simpanUser: string = '/simpan_user';  
}