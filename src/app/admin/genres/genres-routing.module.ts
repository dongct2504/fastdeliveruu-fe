import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreListComponent } from './pages/genre-list.component';
import { GenreEditComponent } from './pages/genre-edit/genre-edit.component';

const routes: Routes = [
  { path: '', component: GenreListComponent },
  { path: 'add', component: GenreEditComponent },
  { path: 'update/:id', component: GenreEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenresRoutingModule { }
