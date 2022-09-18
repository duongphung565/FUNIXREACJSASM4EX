import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

import {
    CardImg, Card,
    Col, Label, Button, Modal, ModalHeader, ModalBody, FormGroup, Row, Input, FormFeedback, BreadcrumbItem, Breadcrumb
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxNumber = (max) => (val) => (val <= max);
const minNumber = (min) => (val) => (val >= min);
function RenderDepartment({ props }) {
    const department = props.departments.filter((staff) => staff.id === props.staff.departmentId)[0];
    return (
        <p key={"department"}>Phòng ban: {department.name}</p>
    )
}
function RenderInfo({ props }) {

    return (
        <Card >
            <h2 key={"name"}>Họ và tên: {props.staff.name}</h2>
            <p key={"doB"}>Ngày sinh: {props.staff.doB ? new Intl.DateTimeFormat('vi-vn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(props.staff.doB))) : ''}</p>
            <p key={"startDate"}>Ngày vào công ty:  {props.staff.startDate ? new Intl.DateTimeFormat('vi-vn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(props.staff.startDate))) : ''}</p>
            <RenderDepartment props={props} />
            <p key={"annualLeave"}>Số ngày nghỉ còn lại: {props.staff.annualLeave}</p>
            <p key={"overTime"}>Số ngày đã làm thêm: {props.staff.overTime}</p>
        </Card>
    )

}
function RenderImage({ props }) {
    return (
        <CardImg src={props.staff.image} alt={props.staff.name} />
    )
}
const EmployeeDetail = (props) => {
    if (props.staff != null) {
        console.log("render");
        const [isModalOpen, setModalOpen] = useState(false);
        const [staff, setStaff] = useState(
            props.staff

        );
        const [newStaff, setNewStaff] = useState({
            doB: '',
            startDate: '',
            touched: {
                doB: false,
                startDate: false,
            }
        })

        const handlerBlur = (field) => (evt) => {
            console.log(newStaff.touched.name);
            setNewStaff({
                ...newStaff,
                touched: {
                    ...newStaff.touched,
                    [field]: true
                }
            })
            console.log(newStaff);

        }
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setNewStaff(prevState => ({
                ...prevState,
                [name]: value
            }));

        }
        const validate2 = (doB, startDate) => {
            console.log("check valid");
            const errors = {
                doB: '',
                startDate: ''
            };

            if (newStaff.touched.doB && doB == '') {
                errors.doB = "Ngày sinh không được để trống"
            }
            if (newStaff.touched.startDate && startDate == '') {
                errors.startDate = "Ngày vào công ty không được để trống"

            }
            if (doB !== "" && startDate !== "" && doB > startDate) {
                errors.doB = "Ngày sinh phải trước ngày vào công ty"
            }
            return errors;
        }
        const errors = validate2(newStaff.doB, newStaff.startDate);
        const toggleModal = () => {
            setModalOpen(!isModalOpen);
        }
        const formatStaff = (newStaff) => {
            return {
                id: staff.id,
                name: newStaff.name,
                doB: newStaff.doB === "" ? staff.doB : newStaff.doB,
                salaryScale: newStaff.salaryScale,
                startDate: newStaff.startDate === "" ? staff.startDate : newStaff.startDate,
                departmentId: newStaff.departmentId === "" ? staff.departmentId : newStaff.department,
                annualLeave: newStaff.annualLeave,
                overTime: newStaff.overTime,
                image: staff.image,
                salary: staff.salary
            }
        }
        //Xóa form
        const clearForm = () => {

            setNewStaff({
                doB: '',
                startDate: '',
                touched: {
                    doB: false,
                    startDate: false,
                }
            })
        }
        const updateHandleSubmit = (values) => {
            const staffEdit = { ...values, ...newStaff };
            props.patchStaff(formatStaff(staffEdit));
            toggleModal();
            clearForm();
        }
        const removeStaff = (id) => {
            console.log("delte" + id);
            //  props.deleteStaff(id);
        }

        return (
            <div className='container employee_detail'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>

                    </Breadcrumb>
                    <div className='col-12'>
                        <hr />
                    </div>
                    <FormGroup row>
                        <Col xs={6} md={6}>
                            <Button type="submit" onClick={toggleModal} color="primary" >Update</Button>
                        </Col>
                        <Col xs={6} md={6}>
                            <Button type="submit" color="danger" onClick={removeStaff(props.staff.id)}>Delete</Button>
                        </Col>

                    </FormGroup>
                </div>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-12'>
                        <RenderImage props={props} />
                    </div>
                    <div className='col-lg-9 col-md-8 col-12 '>
                        <RenderInfo props={props} />
                    </div>
                </div>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal} >
                        Sửa Nhân Viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => updateHandleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="name" md={4} >Tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        defaultValue={staff.name}
                                        validators={
                                            {
                                                minLength: minLength(3), maxLength: maxLength(30)
                                            }
                                        }
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{

                                            minLength: 'Yêu cấu lơn hơn 3 ký tự',
                                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="doB" md={4} >Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB"
                                        defaultValue={staff.doB}
                                        placeholder="Ngày Sinh"
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={handlerBlur('doB')}
                                        onChange={handleInputChange}
                                    />

                                    <FormFeedback>
                                        {errors.doB}
                                    </FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="startDate" md={4} >Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate"
                                        defaultValue={staff.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={handlerBlur('startDate')}
                                        onChange={handleInputChange}
                                    />
                                    <FormFeedback>
                                        {errors.startDate}
                                    </FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="department" md={4} >Phòng ban</Label>
                                <Col md={8}>

                                    <Control.select model=".department" id="department" name="department"
                                        className="form-control"
                                        defaultValue={staff.departmentId}

                                    >
                                        {props.departments.map((department, index) => {
                                            if (department.id === staff.departmentId)
                                                return <option key={department.id} id={department.id} value={department.id} selected="selected">{department.name}</option>
                                            else
                                                return <option key={department.id} id={department.id} value={department.id}>{department.name}</option>
                                        })}
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".department"
                                        show="touched"
                                        messages={{
                                            required: 'Phải chọn phòng ban'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="salaryScale" md={4} >Hệ số lương</Label>
                                <Col md={8}>
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                        placeholder="1.0 -> 3.0"
                                        className="form-control"
                                        defaultValue={staff.salaryScale}
                                        validators={
                                            {
                                                minNumber: minNumber(1), maxNumber: maxNumber(3)
                                            }
                                        }
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: 'Phải nhập hệ số lương',
                                            minNumber: 'Hệ số lương phải lớn hơn 1',
                                            maxNumber: 'Hệ số lương phải nhỏ hơn 3'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="annualLeave" md={4} >Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        defaultValue={staff.annualLeave}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="overTime" md={4} >Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        defaultValue={staff.overTime}
                                        className="form-control"
                                    />
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}

export default EmployeeDetail;