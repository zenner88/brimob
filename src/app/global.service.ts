import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  constructor(private global: GlobalService) { }

    public readonly address: string = 'http://202.67.10.238:5000';  
    public readonly workorder: string = '/datatable';  
    public readonly login: string = '/login_user';  
}