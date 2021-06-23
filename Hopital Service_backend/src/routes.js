import { addUpdateHospital, getListOfHospitals, getListOfDepartments, deleteHospital,saveUpdateDepartment ,deleteDepartment} from "./controller";

const routes = (app) => {
	/* API calls for Hospital List */

	// GET
	app.route('/getHospitals')
		.get(getListOfHospitals)

	// POST 
	app.route('/saveUpdateHospital')
		.post(addUpdateHospital)

	// DELETE
	app.route('/deleteHospitals/:hospitalID')
		.delete(deleteHospital);


	/* API calls for Department List */
	// GET
	app.route('/getDepartments/:hospitalID')
		.get(getListOfDepartments)

	// POST 
	app.route('/saveUpdateDepartment')
		.post(saveUpdateDepartment)

	// DELETE
	app.route('/deleteDepartment/:departmentId')
		.delete(deleteDepartment);
}

export default routes