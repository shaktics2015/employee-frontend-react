import React, { Component } from "react";
import { connect } from "react-redux";
import './App.css';
import Header from './common-components/header/Header';
import EmployeeTable from './common-components/employee-table/EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDepartments } from "./redux/action/departmentAction";
import { getEmployees } from "./redux/action/employeeAction";
import { Form, Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }
  componentDidMount() {
    this.props.getDepartments();
    this.props.getEmployees();
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
  }


  render() {
    let that = this;
    const { department, employee } = that.props;

    return (
      <div>
        <Header />
        <div className="app-body">
          {/* <pre>{JSON.stringify(department, null, 2)}</pre> */}
          <Form className="form-container">
            <Form.Group controlId="employeeForm.firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="John" />
            </Form.Group>
            <Form.Group controlId="employeeForm.lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Wick" />
            </Form.Group>
            <Form.Group controlId="employeeForm.gender">
              <Form.Label>Gender</Form.Label>
              <Form>
                {[{ id: 1, label: "MALE" }, { id: 2, label: "FEMALE" }].map((gender) => (
                  <Form.Check key={gender.id} name="gender" inline label={gender.label} type="radio" id={gender.id} />
                ))}
              </Form>
            </Form.Group>

            <Form.Group controlId="employeeForm.dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" placeholder="10-02-1994" />
            </Form.Group>
            {department && department.data && department.data.length > 0 && <Form.Group controlId="employeeForm.department">
              <Form.Label>Department</Form.Label>
              <Form.Control as="select"> 
                {department.data.map((dept, i) => {
                  return <option key={i}> {dept.name}</option>
                })}
              </Form.Control>
            </Form.Group>}
            <Button type="submit">Save</Button>

          </Form>
          {employee && employee.data && <EmployeeTable employees={employee.data} dateFormatter={that.formatDate} />}

        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => ({
  department: state.department,
  employee: state.employee,
});

const mapDispatchToProps = {
  getDepartments,
  getEmployees
};

export default connect(mapStoreToProps, mapDispatchToProps)(App); 
