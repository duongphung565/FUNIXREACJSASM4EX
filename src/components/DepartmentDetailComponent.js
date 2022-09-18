import React from 'react'

import {
    Card, CardImg, CardBody,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
function RenderCard({ staffs }) {
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
function RenderDepartment({ departments }) {
    return (
        departments.map((depart) => {
            return (
                <BreadcrumbItem active>{depart.name}</BreadcrumbItem>
            )
        })
    );
}
function DepartmentDetail(props) {

    console.log("departdetail");


    return (
        <div className='container department_detail'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/departments">Phòng ban</Link></BreadcrumbItem>
                    <RenderDepartment departments={props.departments} />
                </Breadcrumb>
                <div className='col-12'>
                    <hr />
                </div>
            </div>
            <div className='row'>

                <RenderCard staffs={props.staffs} />



            </div>
        </div>
    );
}
export default DepartmentDetail;