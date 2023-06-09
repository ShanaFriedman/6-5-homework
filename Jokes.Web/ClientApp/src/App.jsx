import React from 'react';
import './App.css';
import Layout from './Layout';
import Signup from './Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import { AuthContextComponent } from './AuthContext';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import ViewAll from './ViewAll';
const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                    <Route exact path='/viewall' element={<ViewAll/>}/>
                </Routes>
            </Layout>
        </AuthContextComponent>)

}

export default App;