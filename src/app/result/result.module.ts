import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReverseService } from './reverse.service';

@NgModule({
  declarations: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ReverseService]
})
export class ResultModule { }
