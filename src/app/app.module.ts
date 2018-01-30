import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AmapComponent } from './amap/amap.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
  {path: '', component: AmapComponent},
  // {path:}
]
@NgModule({
  declarations: [
    AppComponent,
    AmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
