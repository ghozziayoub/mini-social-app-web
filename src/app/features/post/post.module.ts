import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentRowComponent } from './componenets/comment-row/comment-row.component';
import { PostContentComponent } from './componenets/post-content/post-content.component';
import { PostFormComponent } from './componenets/post-form/post-form.component';
import { DetailsComponent } from './pages/details/details.component';
import { PostRoutingModule } from './post-routing.module';
import { CommentFormComponent } from './componenets/comment-form/comment-form.component';

@NgModule({
  declarations: [
    DetailsComponent,
    PostContentComponent,
    CommentRowComponent,
    PostFormComponent,
    CommentFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, PostRoutingModule],
  exports: [PostContentComponent, PostFormComponent],
})
export class PostModule {}
