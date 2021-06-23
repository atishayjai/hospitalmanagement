export class DepartmentInterface {
	"id":number;
	"departmentname": string;
	"head": string;
	"contactnumber": string;
	"hospitalid": string | null;
	"isEditable" : boolean = false;
}