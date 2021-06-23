import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HospitalInterface } from './interfaces/hospital-interface';
import { DepartmentInterface } from './interfaces/department-interface';

@Injectable({
	providedIn: 'root'
})
export class HospitalService {
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private _http: HttpClient) { }

	getHospitalList(): Observable<HospitalInterface[]> {
		return this._http.get<HospitalInterface[]>("http://localhost:4000/getHospitals")
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}
	getDepartments(hospitalId: string | null): Observable<DepartmentInterface[]> {
		return this._http.get<DepartmentInterface[]>("http://localhost:4000/getDepartments/" + hospitalId)
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}

	deleteHospital(hospitalId: number): Observable<string> {
		return this._http.delete<string>("http://localhost:4000/deleteHospitals/" + hospitalId)
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}

	saveUpdateHospitalData(hospitalData: HospitalInterface): Observable<HospitalInterface> {
		return this._http.post<HospitalInterface>("http://localhost:4000/saveUpdateHospital", hospitalData, this.httpOptions)
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}

	saveUpdateDepartmentData(departmentData: DepartmentInterface): Observable<DepartmentInterface> {
		return this._http.post<DepartmentInterface>("http://localhost:4000/saveUpdateDepartment", departmentData, this.httpOptions)
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}

	deleteDepartment(departmentId: number): Observable<string> {
		return this._http.delete<string>("http://localhost:4000/deleteDepartment/" + departmentId)
			.pipe(
				retry(3), // retry a failed request up to 3 times
				catchError(this.handleError) // then handle the error
			);
	}
	dynamicSort(property: any) {

		return function (a: any, b: any) {
			if (a[property] && b[property]) {
				let nameA = a[property].toLowerCase(), nameB = b[property].toLowerCase();
				/* next line works with strings and numbers, 
				 * and you may want to customize it to your needs
				 */
				var result = (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
				return result * 1;
			}
			return 1
		}
	}
	private handleError(error: any) {
		if (error.status === 0) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// Return an observable with a user-facing error message.
		return throwError(
			'Something bad happened; please try again later.');
	}
}
