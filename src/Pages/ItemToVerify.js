import React, { useEffect, useState } from 'react'
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
                        <div className="container card-wrap">


                            {
                                itemList.map((list, index) => {
                                    return (
                                        <ProductCard key={index} category={category} user={user} list={list} index={index} />
                                    )
                                })
                            }

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

const ProductCard = (props) => {
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const [sellerAdd, setSellerAdd] = useState([])
    // const navigate = navigator()

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
    useEffect(() => {
        firebase.database().ref('users/').child(itemData.sellerUID).on('value', (snapshot) => {
            setSellerAdd(snapshot.val());
        })
    }, [])

    const discrad = async () => {
        var propList = props.list

        // delete itemData.cropName
        const { value: reason } = await Swal.fire({
            title: 'Select field validation',
            input: 'select',
            inputOptions: {
                img: 'Image is not proper',
                price: 'Over priced',
                certificate: 'Certificate Number Invalid',
                description: 'Description is Wrong',

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
    const showDetial = () => {
        delete sellerAdd.farmerData
        delete sellerAdd.product_for_sell
        delete sellerAdd.item_rejected
        // delete sellerAdd.phone
        delete sellerAdd.cart
        // delete sellerAdd.email
        // delete sellerAdd.userId
        // delete sellerAdd.address
        delete sellerAdd.orders
        delete sellerAdd.cooperateData


        const theDetial = () => {
            var detail = ""
            Object.keys(sellerAdd).map((col) => { detail = detail + `${col}: ${sellerAdd[col]} <br>` })
            return detail
        }

        Swal.fire("The detail", `<div class="text-left">${theDetial()}</div>`, "info")
    }
    return (
        <>
            <div class="product">
                <div className="img-box-pro">
                    <img onClick={showDetial} src={itemData.imgUrl} alt="wheat" class="pro-img" />
                    {
                        itemData.organic === "yes" && <><div className="green-box"></div></>
                    }
                </div>
                <div class="pro-detail">
                    <h3 class="pro-name">{itemData.name}</h3>
                    <h3 class="pro-price"> ₹ {itemData.price} / {itemData.unit}</h3>
                    {
                        itemData.organic === "yes" && <><h3 class="pro-name">Organic Certi No. :{itemData.certificateNo}</h3></>
                    }
                    <p class="pro-desc"> <i className="fa fa-map-marker-alt"></i> {sellerAdd.district}, {sellerAdd.state}</p>
                </div>
                <div className="d-flex justify-content-evenly">
                    <div onClick={yes} className="btn btn-success"><i className="fa fa-check"></i></div>
                    <div onClick={discrad} className="btn btn-danger"><i className="fa fa-times"></i></div>
                </div>
            </div>

        </>
    )
}
export default ItemsToVerify

