import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { HospitalInterface } from '../interfaces/hospital-interface';
import { faEdit, faSave, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'app-hospital-view',
	templateUrl: './hospital-view.component.html',
	styleUrls: ['./hospital-view.component.scss']
})
export class HospitalViewComponent implements OnInit {
	public hospitalListArray: HospitalInterface[] = [];
	public temphospitalListArray: HospitalInterface[] = [];
	editIcon = faEdit;
	saveIcon = faSave;
	removeIcon = faTrash;
	cancelIcon = faTimesCircle;
	constructor(private hospitalService: HospitalService) { }

	ngOnInit(): void {
		this.getListOfHospitals()

	}

	getListOfHospitals(): void {
		this.hospitalService.getHospitalList()
			.subscribe((res) => {
				if (res) {
					this.hospitalListArray = res;
					this.temphospitalListArray = JSON.parse(JSON.stringify(this.hospitalListArray));
				}
			});
	}
	sort() {
		if (this.hospitalListArray && this.hospitalListArray.length != 0)
			this.hospitalListArray.sort(this.hospitalService.dynamicSort('hospitalname'))

	}

	addHospital(): void {
		let newHospital: HospitalInterface = new HospitalInterface();
		newHospital.isEditable = true;
		this.hospitalListArray.push(newHospital);
	}

	saveHospitalData(hospitalData: HospitalInterface): void {
		this.hospitalService.saveUpdateHospitalData(hospitalData)
			.subscribe((res) => {
				hospitalData.isEditable = false
				if (res && (!hospitalData.id || hospitalData.id == null)) {
					hospitalData.id = res.id
					this.temphospitalListArray.push(res);
				} else {
					this.temphospitalListArray.forEach((ele) => {
						if (ele.id == hospitalData.id) {
							ele.hospitalname = hospitalData.hospitalname;
							ele.contactnumber = hospitalData.contactnumber;
							return
						}
					})
				}
			});
	}

	deleteData(hospitalData: HospitalInterface, index: any): void {
		this.hospitalService.deleteHospital(hospitalData.id)
			.subscribe((res) => {
				if (res) {
					this.hospitalListArray.splice(index, 1);
				}
			});
	}

	resetData(hospitalData: HospitalInterface, index: any): void {
		if (!hospitalData.id)
			this.hospitalListArray.splice(index, 1);
		else {
			this.temphospitalListArray.forEach((ele) => {
				if (ele.id == hospitalData.id) {
					hospitalData.hospitalname = ele.hospitalname;
					hospitalData.contactnumber = ele.contactnumber;
					hospitalData.isEditable = false;
					return
				}
			})

		}
	}
}
