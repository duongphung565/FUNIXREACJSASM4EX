import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, CardHeader } from 'reactstrap';

//Hàm hiển thi thuộc tính từng nhân viên
function RenderSalary({ staffs }) {
    console.log(staffs);
    return (

        staffs.map((staff) => {
            return (
                <div key={staff.id} className='col-lg-4 col-md-6 col-12'>
                    <Card className={'p-2 m-2'}>
                        <CardBody>
                            <h3>{staff.name}</h3>
                            <CardTitle>Mã nhân viên: {staff.id}</CardTitle>
                            <CardTitle>Hệ số lượng: {staff.salaryScale}</CardTitle>
                            <CardTitle>Số ngày làm thêm: {staff.overTime}</CardTitle>
                            <CardTitle>Lương: {staff.salary}</CardTitle>

                        </CardBody>
                    </Card>
                </div>
            )
        })

    )

}
const EmployeeSalarys = (props) => {
    const [sortValueID, setSortID] = useState(false);
    function sortID() {
        setSortID(!sortValueID);
    }
    if (props.staffs != null) {
        return (
            <div className='container employee_detail'>
                <div className='row'>
                    <div className='col-12'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className='col-12'>
                        Sắp xếp:
                        <button onClick={sortID}>Mã nhân viên <span className="fa fa-sort ">
                        </span>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <RenderSalary staffs={props.staffs.sort((a, b) => sortValueID ? a.id - b.id : b.id - a.id)}

                    />
                </div>
            </div>
        );

    }
}

export default EmployeeSalarys;