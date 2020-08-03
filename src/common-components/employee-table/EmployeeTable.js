import React, { Component } from "react";
import './EmployeeTable.css';
import { Table } from "react-bootstrap";

const GenderEnum = {"1": "MALE", "2": "FEMALE"};

export default class EmployeeTable extends Component {

  render() {
    let that = this;
    const { employees, dateFormatter} = that.props;

    return (
      <div className="background">
        {employees && employees.length>0 && <Table borderless hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date of birth</th>
              {employees.length>0 && employees[0].department && <th>Department</th>}
            </tr>
          </thead>
          <tbody>

          {employees.map((employee, i) => {
                    return (
                      <tr key={i}> 
                        <td>{i+1}</td>  
                        <td>{employee.firstName}</td> 
                        <td>{employee.lastName}</td> 
                        <td>{GenderEnum[employee.gender]}</td> 
                        <td>{dateFormatter(employee.dob)}</td> 
                       { employee.department && employee.department.name && <td>{employee.department.name}</td>}
                      </tr>
                    );
          })}  
          </tbody>
        </Table>}
      </div>
    );
  }
}
