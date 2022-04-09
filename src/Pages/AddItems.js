import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import StateDisctrict from "../Components/StateDisctrict"
function AddItem() {
    const [data, setData] = useState({
        cateList: []
    })
    const [itemDetail, setItemDetail] = useState({
    })

    let name, value;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }
    const imgExtRemover = () => {
        var fileName = itemDetail.item_image.name;
        return fileName.split('.').pop()
    }

    const addItem = (e) => {
        e.preventDefault()
        console.log(itemDetail.item_image)
        var TIME_STEMP = Date.now()
        firebase.storage().ref("items/").child(`${TIME_STEMP}.${imgExtRemover()}`).put(itemDetail.item_image, () => {
            console.log('its work')
        }).then(() => {
            console.log('say its work')
            firebase.storage().ref('items/').child(`${TIME_STEMP}.${imgExtRemover()}`).getDownloadURL().then((event) => {
                delete itemDetail.item_image
                console.log(itemDetail)
                firebase.database().ref('items').push({ ...itemDetail, imgUrl: event }).then(() => {
                    Swal.fire("Item Registerd Successfully!", '', 'success')
                })
            })
        })
    }
    const loadData = () => {
        firebase.database().ref('categories/').on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            console.log(snapVal)
            for (let id in snapVal) {
                fatched.push({ id, ...snapVal[id] })

                setData({
                    ...data,
                    cateList: fatched
                })
                console.log(fatched)
            }


        })
    }
    return (

        <div onLoad={loadData} className="main">
            <SlideMenu />
            <div className="main-display">
                <div className="main-child">
                    <SecondMenu title="Add Item" url="#" />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form">
                                    <form action="" onSubmit={addItem}>
                                        <div className="form-group my-4">
                                            <label className="form-label">Name</label>
                                            <input onChange={handleFormChanges}
                                                // required
                                                className="form-control" name="name" type="text" placeholder="Enter Item Name" />
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-6 my-4">
                                                <label className="form-label">Price</label>
                                                <input onChange={handleFormChanges}
                                                    // required
                                                    className="form-control" name="price" type="number" placeholder="Enter Item Price" />
                                            </div>
                                            <div className="form-group col-lg-6 my-4">
                                                <label className="form-label">Unit</label>
                                                <input onChange={handleFormChanges}
                                                    // required
                                                    className="form-control" name="unit" type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Available Quantity</label>
                                            <input onChange={handleFormChanges}
                                                // required
                                                className="form-control" name="quantiy" type="number" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Seller Name</label>
                                            <input onChange={handleFormChanges}
                                                // required
                                                className="form-control" name="seller_name" type="text" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Item Image</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, item_image: e.target.files[0] }) }}
                                                // required
                                                className="form-control" name="item_image" type="file" />
                                        </div>
                                        <StateDisctrict formData={itemDetail} handleFormChanges={handleFormChanges} />
                                        <div className="form-group my-4">
                                            <label className="form-label">Category</label>
                                            <select onChange={handleFormChanges} className="form-control" name="category" id="">
                                                <option value="">Select Category</option>
                                                {
                                                    data.cateList.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.categorieName}>{item.categorieName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <button className="btn  btn-success" type="submit"  >Add Item <i className="fa fa-upload"></i></button>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem
