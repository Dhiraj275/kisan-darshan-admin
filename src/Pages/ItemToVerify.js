import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { NavLink } from 'react-router-dom'
import ItemsTr from '../Components/ItemsTr'
import FlatList from 'flatlist-react';
import Swal from 'sweetalert2'
function ItemsToVerify() {
    const [itemList, setItemList] = useState([]);
    const [user, setUser] = useState([])
    const [category, setCategory] = useState('')
    const [filterData, setFilterData] = useState([])

    const loadData = () => {
        firebase.database().ref('item-to-verify/').on('value', (snapshot) => {
            var snapVal = snapshot.val();
            const itemsArry = [];

            for (let id in snapVal) {
                itemsArry.push({ id, ...snapVal[id] })
            }
            setItemList(itemsArry)

            firebase.database().ref('categories/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                setCategory(fatched)
            })
            firebase.database().ref('users/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const userdata = [];

                for (let id in snapVal) {
                    userdata.push({ id, ...snapVal[id] })
                }
                setUser(userdata)
            })
        })
    }
    return (
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">

                        <SecondMenu title="Manage Items" url="/manage-items" />
                        <div className="container smart-card">
                            <tbody>

                                {
                                    itemList.map((list, index) => {
                                        return (
                                            <ProductCard key={index} category={category} user={user} list={list} index={index} />
                                        )
                                    })
                                }

                            </tbody>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

const ProductCard = (props) => {
    const itemData = props.list
    const yes = () => {
        var propList = props.list
        const itemData = {
            ...propList,
            name: propList.cropName

        }
        delete itemData.cropName
        delete itemData.id
        firebase.database().ref("/items").push(itemData).then(() => {
            Swal.fire("Item listed seccessfully", "", "success").then(() => {
                firebase.database().ref("/users").child(propList.sellerUID).child("product_for_sell").push(itemData).then(() => {
                    firebase.database().ref("/item-to-verify").child(propList.id).remove()
                })

            })
        })

    }
    const discrad = async () => {
        var propList = props.list

        // delete itemData.cropName
        const { value: reason } = await Swal.fire({
            title: 'Select field validation',
            input: 'select',
            inputOptions: {
                img: 'Image is not proper',
                price: 'Over priced',
            },
            inputPlaceholder: 'Select a reason for Rejection',
            showCancelButton: true,
            
        })
        
        if (reason) {
            const itemData = {
            ...propList,
            reason: reason
        }
            firebase.database().ref("/users").child(propList.sellerUID).child("item_rejected").push(itemData).then(() => {
                firebase.database().ref("/item-to-verify").child(propList.id).remove()
            })
        }



    }
    return (
        <div key={`arrayElement${props.index}`} className="card products">
            <div className="img-box" >
                <img loading="lazy" className="card-img-top img-fluid" src={itemData.imgUrl} alt="Card image cap" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{itemData.cropName}</h5>
                <h5 className="card-title">{itemData.category}</h5>
                <p className="price">&#8377;{itemData.price}</p>
                <div className="d-flex justify-content-evenly">
                    <div onClick={yes} className="btn btn-success"><i className="fa fa-check"></i></div>
                    <div onClick={discrad} className="btn btn-danger"><i className="fa fa-times"></i></div>
                </div>
                <br />

            </div>
        </div>
    )
}
export default ItemsToVerify

