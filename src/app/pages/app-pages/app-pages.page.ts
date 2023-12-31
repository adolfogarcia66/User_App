/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Food Delivery Ionic 7 And Laravel
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-app-pages',
  templateUrl: './app-pages.page.html',
  styleUrls: ['./app-pages.page.scss'],
})
export class AppPagesPage implements OnInit {
  title: any = '';
  id: any = '';
  content: any = '';
  apiCalled: boolean = false;
  constructor(
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.name && data.id) {
        this.title = data.name;
        this.id = data.id;
        this.getContent();
      }
    });
  }

  getContent() {
    this.apiCalled = false;
    this.api.post_public('v1/pages/getContent', { "id": this.id }).then((data: any) => {
      console.log(data);
      this.apiCalled = true;
      if (data && data.status && data.status == 200 && data.data) {
        const info = data.data;
        console.log(info);
        this.content = info.content;
      }
    }, error => {
      console.log(error);
      this.apiCalled = true;
      this.util.apiErrorHandler(error);
    }).catch((error: any) => {
      console.log(error);
      this.apiCalled = true;
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }
}
