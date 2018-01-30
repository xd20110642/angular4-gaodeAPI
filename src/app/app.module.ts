import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AmapComponent } from './amap/amap.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HotComponent } from './hot/hot.component';

const router: Routes = [
  {path: '', component: AmapComponent},
  {path: 'hot', component: HotComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AmapComponent,
    HotComponent
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
