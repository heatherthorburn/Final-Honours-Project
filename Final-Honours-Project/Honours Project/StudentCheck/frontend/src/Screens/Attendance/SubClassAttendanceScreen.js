import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import DataTable from 'react-data-table-component'
import {customStyles} from '../../Components/Tables/tableStyle'
import {useDispatch, useSelector} from 'react-redux'
import { getSubClasses } from '../../Actions/lectureActions'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export default function SubClassAttendanceScreen() {
    let { class_code } = useParams();
    
    const dispatch = useDispatch();
    const subs = useSelector((state) => state.subClasses);
    const {classes} = subs
    const [data, setData] = useState([])



    useEffect(() => {
        if (!classes) {
            dispatch(getSubClasses(class_code))
        }
        else {
            var temp = []
            classes.data.forEach((element) => {
                temp.push({type : element.class_type.type_title, group : element.name, id : element.id})
            })
            setData(temp)
        }

    },[dispatch, class_code, classes])

    const columns = [
        {
          name: "Class Type",
          selector: "type",
          sortable: true,
        },
        {
          name: "Group",
          selector: "group",
          sortable: true,
        },
        {
          name: "",
          selector: "",
          style: {
            justifyContent: "flex-end",
          },
          sortable: false,
          cell: (row) => (
            <Link
            
              className="profile-button-link"
              to={{pathname: "/attendance/subclasses/" + class_code + "/"  + row.id,
                state : { group_name : row.group, type : row.type}}}
            >
              <Button className="profile-button">
                <span>Log Attendance</span>
              </Button>
            </Link>
          ),
        },
      ];
    

    return (
        <div>
            {data.length > 0 ? 
        <div className="max-width-900">
              <DataTable
                noDataComponent={null}
                noHeader={true}
                className="data-table"
                columns={columns}
                data={data}
                customStyles={customStyles}
                noContextMenu="true"
              />
            </div>
            : null }
        </div>
    )

}