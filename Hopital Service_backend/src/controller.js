import hospitalsData from './data/hospital.json';
import { hospitalModel ,DepartmentModel} from './model'
import departmentData from './data/department.json';

/* controller logic for hospital data */
export const addUpdateHospital = (req, res) => {
	if (!req.body.id || req.body.id == null) {
		const newHospital = new hospitalModel(req.body);
		hospitalsData.Hospitals.push(newHospital);
		res.json(newHospital);
	}
	else {
		hospitalsData.Hospitals.forEach((ele) => {
			if (ele.id == req.body.id) {
				ele.hospitalname = req.body.hospitalname;
				ele.contactnumber = req.body.contactnumber;
			}
		})
		res.json(req.body.hospitalname + "Updated Successfully");
	}
}

export const getListOfHospitals = (req, res) => {
	res.json(hospitalsData.Hospitals);
}

export const deleteHospital = (req, res) => {
	const hospitalID = req.params.hospitalID;
	hospitalsData.Hospitals = hospitalsData.Hospitals.filter(ele => ele.id != hospitalID);
	res.json("Hospital data deleted successfully.");
}


/* controller logic for Department data */
export const getListOfDepartments = (req, res) => {
	const hospitalID = req.params.hospitalID;
	let resultedArray = [];
	resultedArray = departmentData.Departments.filter(ele => ele.hospitalid == hospitalID)
	res.json(resultedArray);
}

export const saveUpdateDepartment = (req, res) => {
	if (!req.body.id || req.body.id == null) {
		const newDepartment = new DepartmentModel(req.body);
		departmentData.Departments.push(newDepartment);
		res.json(newDepartment);
	}
	else {
		departmentData.Departments.forEach((ele) => {
			if (ele.id == req.body.id) {
				ele.departmentname = req.body.departmentname;
				ele.contactnumber = req.body.contactnumber;
				ele.head = req.body.head
			}
		})
		res.json(req.body.departmentname + "Updated Successfully");
	}
}

export const deleteDepartment = (req, res) => {
	const departmentId = req.params.departmentId;
	departmentData.Departments = departmentData.Departments.filter(ele => ele.id != departmentId);
	res.json("Department data deleted successfully.");
}





