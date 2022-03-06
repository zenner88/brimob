import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  data:any = [];
  errorMessage:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let levelUser = "superadmin";
    let polda = "";
    let satwil = "";
    const body = {      
        "level_user" : levelUser,
        "polda" : polda,
        "satwil" : satwil,
        "start" : 1,
        "limit" : 10
     };
     this.http.post<any>('http://202.67.10.238:5000/datatable', body).subscribe({
        next: data => {
            this.data = data;
            // this.data = JSON.stringify(Object.assign({}, data))
            console.log(data);
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
  }
}
