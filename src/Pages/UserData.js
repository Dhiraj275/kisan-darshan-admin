import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { NavLink } from 'react-router-dom'
import notify from '../audio/notify.wav'
import deleteSfx from '../audio/delete.mp3'
import UserTR from '../Components/UserTR'
function UserData() {
    const [data, setData] = useState([]);
    const audio = new Audio(notify)
    const remove = new Audio(deleteSfx)
    const loadData = () => {
        async function getData() {
            const events = await firebase.firestore().collection('users')
            events.get().then((querySnapshot) => {
                const tempDoc = []
                querySnapshot.forEach((doc) => {
                    tempDoc.push({ id: doc.id, ...doc.data() })
                })
                setData(tempDoc)
                console.log(tempDoc)
            })
        }
        getData()
    }
    // firebase.database().ref('contact-form/').on('child_added', ()=>audio.play())
    // firebase.database().ref('contact-form/').on('child_removed', ()=>remove.play())
    return (
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Manage orders" url="/orders" />
                        <div className="container smart-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Users</h4>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Phone No.</th>
                                            <th>Email</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th className="text-center">Opration</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            data.map((list, index) => {
                                                console.log(list)
                                                return (
                                                    <UserTR index={index} list={list} />
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

export default UserData
