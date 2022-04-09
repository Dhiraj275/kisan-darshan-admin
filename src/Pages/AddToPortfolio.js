import { useState } from "react"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom"
function AddToPortfolio() {
    const [itemDetail, setItemDetail] = useState({
        categorie: ''
    });
    const [categoriesList, setCategoriesList] = useState(undefined)
    const loadData = () => {
        firebase.database().ref('categories/').on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];

            for (let id in snapVal) {
                fatched.push({ id, ...snapVal[id] })

            }
            setCategoriesList(fatched)
        })
    }

    let name, value;
    const getItemDatail = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }

    return (

        <div className="main nav-active" onLoad={loadData}>
            <SlideMenu />
            <div className="main-display">
                <div className="main-child">
                    <SecondMenu title="Add Item" url="/add-item" />
                    <div className="container mt-5">
                        <div className="row">

                            <div className="col-lg-12">
                                <Form categorieName={itemDetail.categorie} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Form = (categorieName) => {
    const [itemDetail, setItemDetail] = useState({
        link: '',
        logo: [],
        portfolioCover: [],
        isUploading: false,
    })

    let name, value;
    const getItemDatail = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }
    const addItem = () => {
        setItemDetail({ ...itemDetail, isUploading: true })
        var coverImg = firebase.storage().ref('portfolio/').child(itemDetail.portfolioCover.name)
        var logoImg = firebase.storage().ref('portfolio/').child(itemDetail.logo.name)
        coverImg.put(itemDetail.portfolioCover)
            .then(() => {
                logoImg.put(itemDetail.logo).then(() => {
                    var logoUrl = "";
                    var portfolioCoverUrl = "";
                    logoImg.getDownloadURL().then((url) => {
                        logoUrl = url
                    })
                        .then(() => {
                            coverImg.getDownloadURL().then((url) => {
                                portfolioCoverUrl = url
                            })
                       .then(() => {
                            firebase.database().ref('portfolio/').push({
                                link: itemDetail.link === "" ? null : itemDetail.link,
                                logoUrl,
                                portfolioCoverUrl
                            }).then(() => {
                                Swal.fire('Portfolio Updated', '', 'success').then(()=>{
                                    window.location.reload(false)
                                })
                            })
                        })
                        })

                })
            })



    }
    return (
        <div className="form-control">
            <div className="form-group my-4">
                <label className="form-label">Link (optional)</label>
                <input required className="form-control" value={itemDetail.value} onChange={getItemDatail} name="link" type="text" placeholder="Enter Name" />
            </div>

            <div className="form-group my-4">
                <label className="form-label">Logo Image</label>
                <input required className="form-control" onChange={(e) => { setItemDetail({ ...itemDetail, logo: e.target.files[0] }) }} type="file" placeholder="Enter Name" />
            </div>
            <div className="form-group my-4">
                <label className="form-label">Portfolio Cover</label>
                <input required className="form-control" onChange={(e) => { setItemDetail({ ...itemDetail, portfolioCover: e.target.files[0] }) }} type="file" placeholder="Enter Name" />
            </div>

            <button type="button" className="btn btn-success" onClick={addItem}>Add</button>{itemDetail.isUploading === false ? "" : <i className="fas fa-spinner fa-pulse"></i>}
        </div>
    )
}
export default AddToPortfolio
