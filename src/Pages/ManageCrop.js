import React, { useState, useEffect } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { NavLink, Link } from 'react-router-dom'
import FlatList from 'flatlist-react';
import Swal from 'sweetalert2'
function ManageCrop() {
    const [itemList, setItemList] = useState([]);
    const [cateList, setCateList] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [filterData, setFilterData] = useState([])

    const loadData = () => {
        firebase.database().ref('crops/').on('value', (snapshot) => {
            var snapVal = snapshot.val();
            const itemsArry = [];

            for (let id in snapVal) {
                itemsArry.push({ id, ...snapVal[id] })
            }
            setItemList(itemsArry)
            setFilterData(itemsArry)
            firebase.database().ref('categories/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                setCateList(fatched)
            })
        })

    }
    const searchFilter = (e) => {
        const text = e.target.value
        if (text) {
            const newData = itemList.filter(item =>
                item.cropName.toLowerCase().includes(text.toLowerCase())
            )
            setSearch(text)
            setFilterData(newData)
        }
        else {
            setSearch(text)
            setFilterData(itemList)
        }

    }
    return (
        <div className="main nav-active" onLoad={loadData}>
            <SlideMenu title="Edit Catrgories" url="/edit-categories" />
            <div className="main-display edit-categories">
                <div className="main-child">
                    <SecondMenu title="Manage crops and items" url="/manage-crops-and-item" />
                    <div className="container smart-card">
                        <select onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="">All</option>
                            {
                                cateList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.categorieName}>{item.categorieName}</option>
                                    )
                                })
                            }
                        </select>
                        <input placeholder="search" value={search} type="text" onChange={searchFilter} className="form-control my-2" />
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="title">All Categories</h4>
                            <NavLink to='/add-crops' ><button className="btn btn-primary">Add Items <i className="fa fa-plus"></i></button></NavLink>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Name</th>
                                        <th>Categorie</th>
                                        <th className="text-center">Opration</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        filterData.map((list, index) => {
                                            return (
                                                <ItemsTr key={index} category={category} cateList={cateList} list={list} index={index} />
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
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
    const editName= () =>{
        Swal.fire({
            title: 'Rename item',
            input: 'text',
            inputValue: props.list.cropName,
            inputAttributes: {
              autocapitalize: 'on'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                firebase.database().ref("crops").child(props.list.id).set({...props.list, cropName: login}).then(()=>{
                    Swal.fire("Rename was succussfull", "", "success")
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
    }
    if (props.category === '') {
        return (
            <tr key={props.index + 6}>
                <td>{props.index + 1}</td>
                <td>{props.list.cropName}</td>
                <td>{props.list.category}</td>
                <td key={props.index + 5} className="text-center">
                    <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                    
                    <i onClick={editName} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i>
                </td>
            </tr>
        )
    }
    else {
        return (
            props.category !== props.list.category ? '' :
                <tr key={props.index}>
                    <td>{props.index + 1}</td>
                    <td>{props.list.cropName}</td>
                    <td>{props.list.category}</td>
                    <td key={props.index + 5} className="text-center">
                        <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                        
                        <i onClick={editName} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i>
                    </td>

                </tr>
        )
    }
}
export default ManageCrop