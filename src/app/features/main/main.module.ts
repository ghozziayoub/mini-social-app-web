import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostModule } from '../post/post.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MainRoutingModule, PostModule],
})
export class MainModule {}
