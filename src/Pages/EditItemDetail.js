import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useLocation } from "react-router-dom"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import StateDisctrict from "../Components/StateDisctrict"
function EditItemDetail() {
  
    const data =  useLocation()
    const [itemDetail, setItemDetail] = useState({
    })

    let name, value;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }
    console.log(data.state.data, data.state.category)
    // useEffect(() => {
    //     const setValues = () => {

    //         setItemDetail({
    //             ...itemDetail,
    //             name,
    //             id,
    //             varient,
    //             price,
    //             category,
    //         })

    //     }
    //     setValues()
    // }, [])
    // console.log()
    // const handleSubmit = () => {
    //     firebase.database().ref('items/').child(id).set({
    //         categorieName: itemDetail.category,
    //         name: itemDetail.name,
    //         price: itemDetail.price,
    //         varient: itemDetail.varient,

    //     }).then(() => {
    //         Swal.fire('Item Updated Successfully', '', 'success')
    //     })
    // }
    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form">
                        <form action="" >
                            <div className="form-group my-4">
                                <label className="form-label">Name</label>
                                <input onChange={handleFormChanges}
                                    required value={data.state.data.name}
                                    className="form-control" name="name" type="text" placeholder="Enter Item Name" />
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-6 my-4">
                                    <label className="form-label">Price</label>
                                    <input onChange={handleFormChanges}
                                        required value={data.state.data.price}
                                        className="form-control" name="price" type="number" placeholder="Enter Item Price" />
                                </div>
                                <div className="form-group col-lg-6 my-4">
                                    <label className="form-label">Unit</label>
                                    <input onChange={handleFormChanges}
                                        required value={data.state.data.unit}
                                        className="form-control" name="unit" type="text" />
                                </div>
                            </div>
                            <div className="form-group my-4">
                                <label className="form-label">Available Quantity</label>
                                <input onChange={handleFormChanges}
                                    required value={data.state.data.quantity}
                                    className="form-control" name="quantity" type="number" />
                            </div>
                            <div className="form-group my-4">
                                <label className="form-label">Seller Name</label>
                                <input onChange={handleFormChanges}
                                    required value={data.state.data.seller_name}
                                    className="form-control" name="seller_name" type="text" />
                            </div>
                            <div className="form-group my-4">
                                <label className="form-label">Item Image</label>
                                <input onChange={(e) => { setItemDetail({ ...itemDetail, item_image: e.target.files[0] }) }}
                                    required 
                                    className="form-control" name="item_image" type="file" />
                            </div>
                            <StateDisctrict formData={itemDetail} handleFormChanges={handleFormChanges} />
                            <div className="form-group my-4">
                                <label className="form-label">Category</label>
                                <select onChange={handleFormChanges} className="form-control" name="category" id="">
                                    <option value="">Select Category</option>
                                    {
                                        data.state.category.map((item, index) => {
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
    )
}

export default EditItemDetail
