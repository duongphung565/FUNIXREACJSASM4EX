import React from 'react';
import {
    Card, CardText,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
function RenderDepartment({ departments }) {
    return (
        <div className='row'>
            {
                departments.map((department) => {
                    return (
                        <div key={department.id} className='col-lg-4 col-md-6 col-12'>
                            <Card className={'p-2 m-2'}>
                                <Link to={`/departments/${department.id}`}>
                                    <CardTitle>{department.name}</CardTitle>
                                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                                </Link>
                            </Card>
                        </div>
                    );
                })
            }
        </div>
    );
}
const Department = (props) => {
    if (props.departments != null) {
        return (
            <div className='container'>
                < RenderDepartment departments={props.departments} />
            </div>
        )
    }


}
export default Department;