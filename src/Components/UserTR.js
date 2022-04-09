import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from '../firebase'

function UserTR(props) {
    const list = props.list
    const deleteItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(() => {
            const item  = firebase.database().ref('contact-form/').child(list.id)
            item.remove()
                .then(() => {
                    Swal.fire(
                        'Deleted Successfull',
                        "",
                        'success'
                    )
                })

        })
    }
    return (
        <tr key={props.index + 6}>
            <td>{props.index +1}</td>
            <td>{list.name}</td>
            <td>{list.phone}</td>
            <td>{list.email}</td>
            <td>{list.address}</td>
            <td>{list.district}</td>
            <td>{list.state}</td>
            <td className="text-center">
                <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
            </td>
        </tr>
    )
}

export default UserTR
