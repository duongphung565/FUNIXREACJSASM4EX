import React, { Component } from 'react';
import { Button, Label } from 'reactstrap';
import dateFormat from 'dateformat';
class StaffList extends Component {
    constructor(props) {
        super(props);
        this.settingColumn = this.settingColumn.bind(this);
        this.state = {
            selectStaff: null,
            numColumn: 6
        }
    }
    onStaffSelect(staff) {
        this.setState({
            selectStaff: staff
        });
    }
    //Hien thị Thông Tin Học Vien Khi Click
    renderStaff(staff) {
        if (staff != null) {
            return (
                <ul className='col-sm-12 col-md-5  detailStaff borderStaff'>
                    <li>    Họ và tên:{staff.name}</li>
                    <li>Ngày sinh:{dateFormat(staff.doB, "dd/mm/yyyy")}</li>
                    <li> Ngày vào công ty:{dateFormat(staff.startDate, "dd/mm/yyyy")}</li>
                    <li> Phòng Ban:{staff.department.name}</li>
                    <li> Số ngày nghỉ còn lại:{staff.annualLeave}</li>
                    <li>Số ngày nghỉ còn lại:{staff.overTime}</li>


                </ul >
            );
        }
    }
    //Setting View when Change
    settingColumn = (event) => {
        this.setState({
            numColumn: event.target.value == 2 ? 6 : event.target.value == 3 ? 4 : event.target.value == 6 ? 2 : 0
        });

    }
    //Hien Thị lựa chọn thay đổi view
    renderSetting() {
        return (
            <form>
                <label >Change Column view</label>
                <select name="numColumn" id="numColumn" onChange={this.settingColumn}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                </select>
            </form>
        )
    }
    //Hiển Thị Học Vien
    render() {

        let styleColumn = "col-sm-" + this.state.numColumn + " col-md-" + this.state.numColumn;
        const menu = this.props.staffList.map((staff) => {
            return (
                <div key={staff.id} className={styleColumn}>
                    <Label onClick={() => this.onStaffSelect(staff)} className='w-100 mt-2 brown borderStaff'>
                        {staff.name}
                    </Label>
                </div>
            );
        });

        return (
            <div className='container' >
                <div className='row'>
                    {this.renderSetting()}
                </div>
                <div className='row' >
                    {menu}
                </div>
                <div className='row'>

                    {this.renderStaff(this.state.selectStaff)}

                </div>

            </div>
        );
    }
}
export default StaffList;