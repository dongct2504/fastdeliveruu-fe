import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminGenresService } from '../../services/admin-genres.service';
import { ToastrService } from 'ngx-toastr';
import { GenreDetailDto } from 'src/app/shared/models/genres/genreDetailDto';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent {
  genreForm!: FormGroup;
  isEditMode = false;
  genreId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private genreService: AdminGenresService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.genreId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEditMode = !!this.genreId;

    this.initForm();

    if (this.isEditMode) {
      this.loadGenre();
    }
  }

  initForm() {
    this.genreForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadGenre() {
    this.genreService.getGenreById(this.genreId).subscribe({
      next: (res: GenreDetailDto) => {
        this.genreForm.patchValue(res);
      }
    });
  }

  onSubmit() {
    if (this.genreForm.invalid) return;

    const command = this.genreForm.value;

    if (this.isEditMode) {
      this.genreService.updateGenre(this.genreId, { ...command, id: this.genreId }).subscribe(() => {
        this.toastr.success('Cập nhật thể loại thành công!');
        this.router.navigate(['/admin/genres']);
      });
    } else {
      this.genreService.createGenre(command).subscribe(() => {
        this.toastr.success('Thêm thể loại thành công!');
        this.router.navigate(['/admin/genres']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/genres']);
  }
}
