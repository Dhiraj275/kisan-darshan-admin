import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
function EditItemDetail() {
    const [data, setData] = useState({
        videoList: ''
    })
    const [itemDetail, setItemDetail] = useState({
        title: '',
        description: '',
        thumbnail: '',
        id: '',
        categorieId: '',
        videoUrl: '',
        thumbnailFileName: ''
    })
    const queryParams = new URLSearchParams(window.location.search);
    var id = queryParams.get('id');
    var name = queryParams.get('name');
    var varient = queryParams.get('varient');
    var price = queryParams.get('price')
    var category = queryParams.get('category')
    useEffect(() => {
        const setValues = () => {

            setItemDetail({
                ...itemDetail,
                name,
                id,
                varient,
                price,
                category,
            })

        }
        setValues()
    }, [])
    const handleSubmit = () => {
        firebase.database().ref('items/').child(id).set({
            categorieName: itemDetail.category,
            name: itemDetail.name,
            price: itemDetail.price,
            varient: itemDetail.varient,

        }).then(()=>{
            Swal.fire('Item Updated Successfully', '', 'success')
        })
    }
    return (

        <div className="main">
            <SlideMenu />
            <div className="main-display">
                <div className="main-child">
                    <SecondMenu title="Edit Item Detail" url="/edit-item-detail" />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form">
                                    <form action="">
                                        <div className="form-group my-4">
                                            <label className="form-label">Name</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, name: e.target.value }) }} value={itemDetail.name} required className="form-control" name="title" type="text" placeholder="Enter Video Title" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Price</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, price: e.target.value }) }} value={itemDetail.price} required className="form-control" name="title" type="number" placeholder="Enter Video Title" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Category</label>
                                            <input value={itemDetail.category} required className="form-control" disabled type="text"  />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Varient</label>
                                            <input  value={itemDetail.varient} required className="form-control" disabled type="text"  />
                                        </div>
                                        <button onClick={handleSubmit} className="btn  btn-success" type="button"  >Update Detail <i className="fa fa-upload"></i></button>

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

export default EditItemDetail
