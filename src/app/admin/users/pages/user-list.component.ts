import { Component } from '@angular/core';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { AdminUserService } from '../services/admin-user.service';
import { AppUserWithRolesDto } from 'src/app/shared/models/users/appUserWithRolesDto';
import { RoleConstants } from 'src/app/shared/constants/role-constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: AppUserWithRolesDto[] = [];
  totalRecords = 0;
  itemsPerPage = 0;

  defaultParams: DefaultParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    search: ''
  };

  roles = [
    { value: RoleConstants.Admin, label: 'Quản trị viên' },
    { value: RoleConstants.Staff, label: 'Nhân viên' },
    { value: RoleConstants.Customer, label: 'Người mua' },
    { value: RoleConstants.Shipper, label: 'Người giao hàng' }
  ];

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUserService.getUsersWithRoles(this.defaultParams).subscribe(result => {
      this.users = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize
    });
  }

  onPageChanged(event: any) {
    if (this.defaultParams.pageNumber !== event) {
      this.defaultParams.pageNumber = event;
      this.loadUsers();
    }
  }

  onSearch(value: string): void {
    this.defaultParams.search = value;
    this.defaultParams.pageNumber = 1;
    this.loadUsers();
  }

  onSort(sort: string): void {
    this.defaultParams.sort = sort;
    this.loadUsers();
  }

  toggleLock(user: AppUserWithRolesDto) {
    const action = user.isLocked ? 'unlock' : 'lock';
    this.adminUserService.toggleUserLock(user.userName, action).subscribe(() => {
      user.isLocked = !user.isLocked;
    });
  }

  // updateRoles(user: AppUserWithRolesDto) {
  //   this.adminUserService.updateUserRoles(user.userName, user.roles).subscribe(() => {
  //     console.log('Cập nhật roles thành công:', user.userName, user.roles);
  //   });
  // }
}
