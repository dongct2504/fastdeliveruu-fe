import { Component, TemplateRef } from '@angular/core';
import { DefaultParams } from 'src/app/shared/models/DefaultParams';
import { AdminUserService } from '../services/admin-user.service';
import { AppUserWithRolesDto } from 'src/app/shared/models/users/appUserWithRolesDto';
import { RoleConstants } from 'src/app/shared/constants/role-constants';
import { faPlus, faSearch, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: AppUserWithRolesDto[] = [];
  totalRecords = 0;
  itemsPerPage = 0;

  params: DefaultParams = {
    pageNumber: 1,
    pageSize: 10,
    sort: '',
    search: ''
  };

  selectedUser: any = null;
  selectedRoles: string[] = [];
  modalRef?: BsModalRef;
  roles = [
    { value: RoleConstants.Admin, label: 'Quản trị viên' },
    { value: RoleConstants.Staff, label: 'Nhân viên' },
    { value: RoleConstants.Customer, label: 'Người mua' },
    // { value: RoleConstants.Shipper, label: 'Người giao hàng' }
  ];

  // icons
  faPlus = faPlus;
  faSearch = faSearch;
  faUserShield = faUserShield;

  constructor(private adminUserService: AdminUserService,
    private toast: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  getRoleLabels(roleKeys: string[]): string {
    return roleKeys
      .map(role => this.roles.find(r => r.value === role)?.label || role)
      .join(', ');
  }


  loadUsers(): void {
    this.adminUserService.getUsersWithRoles(this.params).subscribe(result => {
      this.users = result.items;
      this.totalRecords = result.totalRecords;
      this.itemsPerPage = result.pageSize
    });
  }

  onPageChanged(event: any) {
    if (this.params.pageNumber !== event) {
      this.params.pageNumber = event;
      this.loadUsers();
    }
  }

  onSearch(): void {
    this.params.pageNumber = 1;
    this.loadUsers();
  }

  onSort(sort: string): void {
    this.params.sort = sort;
    this.loadUsers();
  }

  openRoleModal(user: any, template: TemplateRef<any>): void {
    this.selectedUser = user;
    this.selectedRoles = [...user.roles]; // Clone để không ảnh hưởng trực tiếp
    this.modalRef = this.modalService.show(template);
  }

  toggleLock(user: AppUserWithRolesDto) {
    const action = user.isLocked ? 'unlock' : 'lock';
    this.adminUserService.toggleUserLock(user.userName, action).subscribe(() => {
      user.isLocked = !user.isLocked;
    });
  }

  toggleRole(role: string): void {
    if (this.selectedRoles.includes(role)) {
      this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    } else {
      this.selectedRoles.push(role);
    }
  }

  saveRoles(): void {
    if (this.selectedUser) {
      this.selectedUser.roles = [...this.selectedRoles];
      this.updateRoles(this.selectedUser);
    }
    this.modalRef?.hide();
  }

  updateRoles(user: AppUserWithRolesDto) {
    this.adminUserService.updateUserRoles(user.id, user.roles.join(',')).subscribe(() => {
      this.toast.success('Cập nhật roles thành công:')
    });
  }
}
