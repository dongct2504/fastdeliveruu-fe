import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminGenresService } from 'src/app/admin/genres/services/admin-genres.service';
import { AdminRestaurantService } from 'src/app/admin/restaurants/services/admin-restaurant.service';
import { GenreDto } from 'src/app/shared/models/genres/genreDto';
import { RestaurantDto } from 'src/app/shared/models/restaurants/restaurantDto';
import { AdminMenuItemService } from '../../services/admin-menu-item.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';

@Component({
  selector: 'app-menu-item-edit',
  templateUrl: './menu-item-edit.component.html',
  styleUrls: ['./menu-item-edit.component.css']
})
export class MenuItemEditComponent {
  menuItemForm!: FormGroup;
  isEditMode = false;
  menuItemId!: string;

  restaurants: RestaurantDto[] = [];
  genres: GenreDto[] = [];

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: AdminRestaurantService,
    private genreService: AdminGenresService,
    private menuItemService: AdminMenuItemService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.menuItemId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEditMode = !!this.menuItemId;

    this.initForm();
    this.loadRestaurants();
    this.loadGenres();

    if (this.isEditMode) {
      this.loadMenuItem();
    }
  }

  initForm() {
    this.menuItemForm = this.fb.group({
      restaurantId: ['', Validators.required],
      genreId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercent: [0, [Validators.min(0), Validators.max(1)]],
      quantityAvailable: [0, [Validators.required, Validators.min(0)]],
      quantityReserved: [{ value: 0, disabled: true }],
    });
  }

  private loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(res => {
      this.restaurants = res.items;
    });
  }

  private loadGenres() {
    this.genreService.getAllGenres().subscribe(res => {
      this.genres = res;
    });
  }

  private loadMenuItem() {
    this.menuItemService.getById(this.menuItemId).subscribe({
      next: (res: MenuItemDetailDto) => {
        this.menuItemForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          discountPercent: res.discountPercent,
          restaurantId: res.restaurantDto?.id,
          genreId: res.genreDto?.id,
          quantityAvailable: res.quantityAvailable,
          quantityReserved: res.quantityReserved,
        });

        if (res.imageUrl) {
          this.previewUrl = res.imageUrl;
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = e => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onSubmit() {
    if (this.menuItemForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.menuItemForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    if (this.isEditMode) {
      formData.append('id', this.menuItemId);
      this.menuItemService.update(this.menuItemId, formData).subscribe(() => {
        this.toastr.success('Cập nhật món ăn thành công!');
        this.router.navigate(['/admin/menu-items']);
      });
    } else {
      this.menuItemService.create(formData).subscribe(() => {
        this.toastr.success('Thêm món ăn thành công!');
        this.router.navigate(['/admin/menu-items']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/menu-items']);
  }
}
