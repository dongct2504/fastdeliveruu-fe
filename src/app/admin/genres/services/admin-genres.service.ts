import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGenreCommand } from 'src/app/shared/models/genres/createGenreCommand';
import { GenreDetailDto } from 'src/app/shared/models/genres/genreDetailDto';
import { GenreDto } from 'src/app/shared/models/genres/genreDto';
import { UpdateGenreCommand } from 'src/app/shared/models/genres/updateGenreCommand';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminGenresService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllGenres(search?: string) {
    let params = new HttpParams;
    if (search) {
      params = params.set('search', search);
    }
    return this.httpClient.get<GenreDto[]>(
      `${this.apiUrl}/genres`, { params: params }
    );
  }

  getGenreById(id: string) {
    return this.httpClient.get<GenreDetailDto>(
      `${this.apiUrl}/genres/${id}`
    );
  }

  createGenre(command: CreateGenreCommand) {
    return this.httpClient.post<GenreDto>(
      `${this.apiUrl}/genres`,
      command
    );
  }

  updateGenre(id: string, command: UpdateGenreCommand) {
    return this.httpClient.put<void>(
      `${this.apiUrl}/genres/${id}`,
      command
    );
  }

  deleteGenre(id: string) {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/genres/${id}`
    );
  }
}
