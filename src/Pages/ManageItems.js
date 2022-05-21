import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { NavLink } from 'react-router-dom'
import ItemsTr from '../Components/ItemsTr'
import FlatList from 'flatlist-react';
function ManageItems() {
    const [itemList, setItemList] = useState([]);
    const [cateList, setCateList]= useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [filterData, setFilterData] = useState([])
   
    const loadData = () => {
        firebase.database().ref('items/').on('value', (snapshot) => {
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
              item.name.toLowerCase().includes(text.toLowerCase())
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
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                       
                        <SecondMenu title="Manage Items" url="/manage-items" />
                        <div className="container smart-card">
                        <select onChange={(e)=>{setCategory(e.target.value)}}>
                            <option value="">All</option>
                            {
                                cateList.map((item, index)=>{
                                    return(
                                        <option key={index} value={item.categorieName}>{item.categorieName}</option>
                                    )
                                })
                            }
                        </select>
                            <input placeholder="search" value={search} type="text" onChange={searchFilter} className="form-control my-2" />
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Categories</h4>
                                <NavLink to='/add-item' ><button className="btn btn-primary">Add Items <i className="fa fa-plus"></i></button></NavLink>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Quantity.</th>
                                            <th>Categorie</th>
                                            <th>Price.</th>
                                            <th className="text-center">Opration</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            filterData.map((list, index) => {
                                                return (
                                                    <ItemsTr key={index} category={category} cateList={cateList}  list={list} index={index} />
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

        </>
    )
}

export default ManageItems

