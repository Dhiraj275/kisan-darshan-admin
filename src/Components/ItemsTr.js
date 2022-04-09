import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import firebase from '../firebase'
import { Link } from 'react-router-dom';
function ItemsTr(props) {
    const deleteItem = () => {
        Swal.fire(
            'Do you really want to delelte these item?',
            '',
            'warning'
        ).then(() => {

            const ItemRef = firebase.database().ref('items/').child(props.list.id);
            ItemRef.remove().then(() => {
                Swal.fire(
                    'Deleted Successfull',
                    "",
                    'success'
                )
            })



        })

    }

    if (props.category === '') {
        return (
            <tr key={props.index + 6}>
                <td>{props.index + 1}</td>
                <td>{props.list.name}</td>
                <td>{props.list.varient}</td>
                <td>{props.list.categorieName}</td>
                <td>&#8377; {props.list.price}</td>
                <td key={props.index + 5} className="text-center">
                    <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                    <Link
                        to={{
                            pathname: '/edit-item-detail',
                            search: `?id=${props.list.id}&name=${props.list.name}&category=${props.list.categorieName}&price=${props.list.price}&varient=${props.list.varient}`,
                            state: { fromDashboard: true }
                        }
                        }
                    ><i style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i></Link>
                </td>
            </tr>
        )
    }
    else {
        return (
            props.category !== props.list.categorieName ? '' :
                <tr key={props.index + 6}>
                    <td>{props.index + 1}</td>
                    <td>{props.list.name}</td>
                    <td>{props.list.varient}</td>
                    <td>{props.list.categorieName}</td>
                    <td>&#8377; {props.list.price}</td>
                    <td key={props.index + 5} className="text-center">
                        <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                        <Link
                            to={{
                                pathname: '/edit-item-detail',
                                search: `?id=${props.list.id}&name=${props.list.name}&category=${props.list.categorieName}&price=${props.list.price}&varient=${props.list.varient}`,
                                state: { fromDashboard: true }
                            }
                            }
                        ><i style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i></Link>
                    </td>

                </tr>
        )
    }
}

export default ItemsTr
