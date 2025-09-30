import { Component, OnInit } from '@angular/core';
import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GenreDto } from 'src/app/shared/models/genres/genreDto';
import { AdminGenresService } from '../services/admin-genres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {
  genres: GenreDto[] = [];
  search: string = '';

  // icons
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;

  constructor(
    private genreService: AdminGenresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(search?: string): void {
    this.genreService.getAllGenres(search).subscribe(result => {
      this.genres = result;
    });
  }

  onSearch(): void {
    this.loadGenres(this.search);
  }

  editGenre(id: string) {
    this.router.navigate(['/admin/genres/update', id]);
  }

  deleteGenre(id: string) {
    if (confirm('Bạn có chắc muốn xóa thể loại này?')) {
      this.genreService.deleteGenre(id).subscribe(() => {
        this.genres = this.genres.filter(g => g.id !== id);
      });
    }
  }
}
