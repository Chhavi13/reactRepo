import React, { useState } from 'react';
import  FormCrud from '../FunctionalComponent/FormCrud';

function TableData(props) {
const [studentData, setStudentData] = useState(props);
// const tableRows = studentData.map((info) => {

// 	console.log(studentData)
// 	return (
// 	<tr>
// 		<td>{info.id}</td>
// 		<td>{info.myname}</td>
// 		<td>{info.city}</td>
// 	</tr>
// 	);
// });


const addRows = (data) => {
	const totalStudents = studentData.length;
	data.id = totalStudents + 1;
	const updatedStudentData = [...studentData];
	updatedStudentData.push(data);
	setStudentData(updatedStudentData);
};

return (
	<div>
	<table className="table table-stripped">
		<thead>
		<tr>
			<th>Sr.NO</th>
			<th>Name</th>
			<th>City</th>
		</tr>
		</thead>
		{/* <tbody>{tableRows}</tbody> */}
	</table>
	<FormCrud func={addRows} />
	</div>
);
}

export default TableData;
