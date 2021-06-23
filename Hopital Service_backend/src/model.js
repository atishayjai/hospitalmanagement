export const hospitalModel = (data) => ({
	"id": data.id ? data.id : Math.random(),
	"hospitalname": data.hospitalname,
	"contactnumber": data.contactnumber
})


export const DepartmentModel = (data) => ({
	"id": data.id ? data.id : Math.random(),
	"hospitalid": data.hospitalid,
	"contactnumber": data.contactnumber,
	"departmentname": data.departmentname,
	"head": data.head
})
