import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentInterface } from '../interfaces/department-interface';
import { faEdit, faSave, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'app-department-view',
	templateUrl: './department-view.component.html',
	styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements OnInit {
	public hospitalId: string | null = "";
	public DepartmentListArray: DepartmentInterface[] = [];
	public tempDepartmentListArray: DepartmentInterface[] = [];
	editIcon = faEdit;
	saveIcon = faSave;
	removeIcon = faTrash;
	cancelIcon = faTimesCircle;
	constructor(private hospitalService: HospitalService,
		private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.hospitalId = this.route.snapshot.paramMap.get('id');
		this.getListOfDepartments(this.hospitalId)

	}

	getListOfDepartments(hospitalId: string | null): void {
		this.hospitalService.getDepartments(hospitalId)
			.subscribe((res) => {
				if (res) {
					this.DepartmentListArray = res;
					this.tempDepartmentListArray = JSON.parse(JSON.stringify(this.DepartmentListArray));
				}
			});
	}


	navigate(): void {
		this.router.navigate(['/hospital'])
	}

	sort(){
		if(this.DepartmentListArray && this.DepartmentListArray.length!=0)
		this.DepartmentListArray.sort(this.hospitalService.dynamicSort("departmentname"))
	}

	addDepartment(): void {
		let newDepartment: DepartmentInterface = new DepartmentInterface();
		newDepartment.isEditable = true;
		this.DepartmentListArray.push(newDepartment);
	}

	saveDepartmentData(departmentData: DepartmentInterface): void {
		departmentData.hospitalid = this.hospitalId;
		this.hospitalService.saveUpdateDepartmentData(departmentData)
			.subscribe((res) => {
				departmentData.isEditable = false
				if (res && (!departmentData.id || departmentData.id== null)) {
					departmentData.id = res.id;
					this.tempDepartmentListArray.push(res);
				}else{
					this.tempDepartmentListArray.forEach((ele) => {
						if (ele.id == departmentData.id) {
							ele.departmentname = departmentData.departmentname;
							ele.contactnumber = departmentData.contactnumber ;
							ele.head = departmentData.head;
							return
						}
					})
				}
			});
	}

	deleteData(departmentData: DepartmentInterface, index: any): void {
		this.hospitalService.deleteDepartment(departmentData.id)
			.subscribe((res) => {
				if (res) {
					this.DepartmentListArray.splice(index, 1);
				}
			});
	}

	resetData(departmentData: DepartmentInterface, index: any): void {
		if (!departmentData.id)
			this.DepartmentListArray.splice(index, 1);
		else {
			this.tempDepartmentListArray.forEach((ele) => {
				if (ele.id == departmentData.id) {
					departmentData.contactnumber = ele.contactnumber;
					departmentData.head = ele.head;
					departmentData.departmentname = ele.departmentname
					departmentData.isEditable = false;
					return
				}
			})

		}
	}
}
