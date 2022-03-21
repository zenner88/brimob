import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss']
})
export class EbookComponent implements OnInit {
  errorMessage:any;
  tittle: string = "List E-Book";
  workorders:any = [];
  allWorkorders:any = [];
  filterTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 8;

  constructor(private http: HttpClient, private global: GlobalService) { }

  ngOnInit() {       
    this.http.post<any>(this.global.address+this.global.workorder, this.global.body, this.global.headers).subscribe({
    next: data => {
      this.collectionSize = data.length;
      this.workorders = data;
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        if (error.status == 401 ){
          AuthInterceptor.signOut();
        }
    }
    })
  }
}