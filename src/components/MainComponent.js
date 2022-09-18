import React, { Component } from 'react';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Employee from './EmployeeComponent.js';
import EmployeeDetail from './EmployeeDetailComponent.js';
import SalaryEmployee from './SalaryComponent.js'
import Department from './DepartmentComponent.js';
import DepartmentDetail from './DepartmentDetailComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStaffs } from '../redux/ActionCreators.js';
import { fetchDepartment } from '../redux/ActionCreators';
import { fetchStaffsSalary, postStaff, patchStaff, deleteStaff } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        department: state.department,
        staffsSalary: state.staffsSalary
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchDepartment: () => {
        dispatch(fetchDepartment())

    },
    fetchStaffsSalary: () => {
        dispatch(fetchStaffsSalary())
    },

    postStaff: (newStaff) => dispatch(postStaff(newStaff)),
    patchStaff: (updateStaff) => dispatch(patchStaff(updateStaff)),
    deleteStaff: (id) => dispatch(deleteStaff(id))
});
class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartment();
        this.props.fetchStaffsSalary();
    }
    render() {
        const EmployeePage = () => {
            return (
                <Employee staffs={this.props.staffs.staffs} departments={this.props.department.department} postStaff={this.props.postStaff} />
            );
        }
        const DepartmentsPage = () => {
            return (
                <Department departments={this.props.department.department} />
            );
        }
        const StaffWithId = ({ match }) => {

            return (
                <EmployeeDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]} departments={this.props.department.department} patchStaff={this.props.patchStaff} deleteStaff={this.props.deleteStaff} />
            )
        }
        const DepartmentWithId = ({ match }) => {
            return (
                <DepartmentDetail staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departId)} departments={this.props.department.department.filter((depart) => depart.id === match.params.departId)} />
            );
        }
        const SalaryPage = () => {
            return (

                <SalaryEmployee staffs={this.props.staffsSalary.staffsSalary} />
            );
        }
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>

                        <Switch>
                            <Route path="/staffs/:staffId" component={StaffWithId} />
                            <Route path="/staffs" component={EmployeePage} />
                            <Route path="/departments/:departId" component={DepartmentWithId} />
                            <Route
                                path="/departments" component={DepartmentsPage}
                            />
                            <Route path="/salary" component={SalaryPage} />
                            <Redirect to="/staffs" />
                        </Switch >

                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
