import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import EditCategories from './EditCategories';
import ManageItems from './ManageItems';
import EditItemDetail from './EditItemDetail';

import Poll from './Poll';
import UserData from './UserData';
import AddItem from './AddItems';
import ManageOrders from './ManageOrder';
import AddCrops from './AddCrops';
import ItemsToVerify from './ItemToVerify';
import ContactMails from './ContactMail';
import ManageCrop from './ManageCrop';
// import Login from './Login';
function AdminPanel() {
    return (
        <>
            <Switch>
                <Route exact path="/users" component={UserData} />
                <Route exact path="/" component={ManageItems} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/manage-item" component={ManageItems} />
                <Route exact path="/edit-categories" component={EditCategories} />
                <Route exact path="/add-item" component={AddItem} />
                <Route exact path="/polls" component={Poll} />
                <Route exact path="/manage-orders" component={ManageOrders} />
                <Route exact path="/add-crops" component={AddCrops} />
                <Route exact path="/contact-mails" component={ContactMails} />
                <Route exact path="/edit-item-detail" component={EditItemDetail} />
                <Route exact path="/items-to-verify" component={ItemsToVerify} />
                <Route exact path="/manage-crops-and-item" component={ManageCrop} />

            </Switch>
        </>
    )
}

export default AdminPanel
