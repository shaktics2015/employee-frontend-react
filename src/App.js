import React, { Component } from "react";
import { connect } from "react-redux";
import './App.css';
import Header from './common-components/header/Header';
import EmployeeTable from './common-components/employee-table/EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDepartments } from "./redux/action/departmentAction";
import { getEmployees, saveEmployee } from "./redux/action/employeeAction";
import { Form, Button } from "react-bootstrap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      employee: { 
        gender: '',
        dob: '2015-08-09',
        department: ''
      }
    };
    this.formatDate = this.formatDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentDidMount() {
    this.props.getDepartments();
    this.props.getEmployees();
  } 

  handleValidation() {
    let employee = this.state.employee;
    let errors = {};
    let formIsValid = true;

    //First Name
    if (!employee.firstName) {
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
    }

    if (typeof employee.firstName !== "undefined") {
      if (!employee.firstName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstName"] = "Only letters";
      }
    }

    //Last Name
    if (!employee.lastName) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }

    if (typeof employee.lastName !== "undefined") {
      if (!employee.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastName"] = "Only letters";
      }
    }

    //Gender
    if (!employee.gender) {
      formIsValid = false;
      errors["gender"] = "Cannot be empty";
    }

    if (typeof employee.gender !== "undefined") {
      if (!employee.gender.match(/^[1-2]+$/)) {
        formIsValid = false;
        errors["gender"] = "Select only field";
      }
    }

    if (!employee.dob) {
      formIsValid = false;
      errors["dob"] = "Cannot be empty";
    }

    if (!employee.department) {
      formIsValid = false;
      errors["department"] = "Cannot be empty";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
  }

  handleSubmit(event) {
    console.log('form submitted new: ', this.state.employee);

    if (this.handleValidation()) {
      this.props.saveEmployee(this.state.employee);
      setTimeout(
        function () {
          this.props.getEmployees();
          // this.refs.employeeForm.reset();

          Object.keys(this.state).map((key, index) => {
            this.setState({[key] : ""});
         });
        }
          .bind(this),
        1000
      ); 
    } else {
      // alert("Form has errors.")
    }
    event.preventDefault();
  }


  handleChange(key, event) {
    var employee = this.state.employee;
    employee[key] = event.target.value;
   delete this.state.errors[key]; 
    this.setState({ employee: employee });
  }

  render() {
    let that = this;
    const { department, employee } = that.props;

    return (
      <div>
        <Header />
        <div className="app-body">
          {/* <pre>{JSON.stringify(department, null, 2)}</pre> */}
          <Form ref="employeeForm" className="form-container" onSubmit={this.handleSubmit}>
            <Form.Group controlId="employeeForm.firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control onChange={(e) => this.handleChange('firstName', e)} value={this.state.employee.firstName} type="text" placeholder="John" />
              <Form.Label style={{color: "red"}}>{this.state.errors["firstName"]}</Form.Label>
            </Form.Group>
            <Form.Group controlId="employeeForm.lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control onChange={(e) => this.handleChange('lastName', e)} value={this.state.employee.lastName} type="text" placeholder="Wick" />
              <Form.Label style={{color: "red"}}>{this.state.errors["lastName"]}</Form.Label>
            </Form.Group>
            <Form.Group controlId="employeeForm.gender">
              <Form.Label>Gender</Form.Label><br></br>
              {[{ id: 1, label: "MALE" }, { id: 2, label: "FEMALE" }].map((gender) => (
                <Form.Check onChange={(e) => this.handleChange('gender', e)} value={gender.id} key={gender.id} name="gender" inline label={gender.label} type="radio" id={gender.id} />
              ))}
              <Form.Label style={{color: "red"}}>{this.state.errors["gender"]}</Form.Label>
            </Form.Group>

            <Form.Group controlId="employeeForm.dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control onChange={(e) => this.handleChange('dob', e)} value={this.state.employee.dob} data-date="" data-date-format="DD MMMM YYYY" type="date" />
              <Form.Label style={{color: "red"}}>{this.state.errors["dob"]}</Form.Label>
            </Form.Group>

            {department && department.data && department.data.length > 0 && <Form.Group controlId="employeeForm.department">
              <Form.Label>Department</Form.Label>
              <Form.Control onChange={(e) => this.handleChange('department', e)} value={this.state.employee.department} as="select">
                <option value={0} > Select a Department</option>
                {department.data.map((dept, i) => {
                  return <option value={dept.id} key={i}> {dept.name}</option>
                })}
              </Form.Control>
              <Form.Label style={{color: "red"}}>{this.state.errors["department"]}</Form.Label>
            </Form.Group>}
            <Button type="submit" >Save</Button>

          </Form>
          
          {employee && employee.data && <div><hr></hr>
          <h4>Employees</h4>
          <hr></hr>
          <EmployeeTable employees={employee.data} dateFormatter={that.formatDate} /></div>}

        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => ({
  department: state.department,
  employee: state.employee,
  saveEmployee: state.saveEmployee

});

const mapDispatchToProps = {
  getDepartments,
  getEmployees,
  saveEmployee
};

export default connect(mapStoreToProps, mapDispatchToProps)(App); 
