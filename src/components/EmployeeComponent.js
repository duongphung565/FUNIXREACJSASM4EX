import React, { useRef, useState } from 'react'

import {
    Card, CardImg, CardBody,
    CardTitle, Col, Label, Button, Modal, ModalHeader, ModalBody, FormGroup, Row, Input, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors, Field } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxNumber = (max) => (val) => (val <= max);
const minNumber = (min) => (val) => (val >= min);

function RenderCard({ staffs, onClick, props }) {

    return (
        staffs.map((staff) => {
            return (
                <div key={staff.id} className='col-lg-2 col-md-4 col-6'>
                    <Card className={'p-2 m-2'}>
                        <Link to={`/staffs/${staff.id}`}>
                            <CardBody>
                                <CardImg src={staff.image} alt={staff.name} />
                                <CardTitle>{staff.name}</CardTitle>

                            </CardBody>
                        </Link>

                    </Card>
                </div >
            )
        })
    );
}

function Employee(props) {
    const [searchInput, setSearchInput] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const inputEL = useRef();

    const [newStaff, setNewStaff] = useState({
        doB: '',
        startDate: '',
        touched: {
            doB: false,
            startDate: false,
        }
    })

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
    const checkValidate = () => {
        if (errors.doB === '' && errors.startDate === '' && newStaff.touched.doB && newStaff.touched.startDate) {

            return true;
        } else {
            return false;
        }


    }
    //Kiểm tra gán touched cho sư kiên click vào input
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
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(inputEL.current.value);
        setSearchInput(inputEL.current.value);
    }
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }

    const formatStaff = (newStaff) => {
        const staff = {
            name: newStaff.name,
            doB: newStaff.doB,
            salaryScale: newStaff.salaryScale,
            startDate: newStaff.startDate,
            departmentId: newStaff.department,
            annualLeave: newStaff.annualLeave,
            overTime: newStaff.overTime,
            image: '/assets/images/alberto.png',
            salary: 0

        }
        return staff
    }
    const addHandleSubmit = (values) => {
        if (checkValidate) {
            const staff = { ...values, ...newStaff };
            props.postStaff(formatStaff(staff));
            toggleModal();
            clearForm();
        }

    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStaff(prevState => ({
            ...prevState,
            [name]: value
        }));

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
    const errors = validate2(newStaff.doB, newStaff.startDate);
    const listSearch = props.staffs.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>

                    <form onSubmit={submitHandler}>
                        <FormGroup row>
                            <Col xs={8} md={4}>
                                <Label>Nhân viên</Label>
                            </Col>

                            <Col xs={4} md={2}>
                                <Button type="submit" onClick={toggleModal} >+</Button>
                            </Col>

                            <Col xs={8} md={4}>
                                <input ref={inputEL}

                                />
                            </Col>
                            <Col xs={4} md={2}>
                                <Button type="submit" color="primary">Tìm</Button>

                            </Col>

                        </FormGroup>
                    </form>
                </div>
            </div>
            <div className='row'>

                <RenderCard staffs={listSearch} props={props} />


            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} >
                    Thêm Nhân Viên
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => addHandleSubmit(values)}>

                        <Row className="form-group">
                            <Label htmlFor="name" md={4} >Tên</Label>
                            <Col md={8}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={
                                        {
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Phải nhập tên',
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
                                    placeholder="Ngày Sinh"
                                    value={newStaff.doB}
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
                                    value={newStaff.startDate}
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

                                    validators={
                                        {
                                            required
                                        }
                                    }
                                >
                                    {props.departments.map((department, index) => {
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
                                    validators={
                                        {
                                            required, minNumber: minNumber(1), maxNumber: maxNumber(3)
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
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="overTime" md={4} >Số ngày đã làm thêm</Label>
                            <Col md={8}>
                                <Control.text model=".overTime" id="overTime" name="overTime"
                                    className="form-control"
                                />
                            </Col>

                        </Row>
                        <Row className="form-group">
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Thêm
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>

        </div >
    );
}
export default Employee;

