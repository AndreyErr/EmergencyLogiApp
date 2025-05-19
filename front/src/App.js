import React, { useContext, useEffect, useState } from "react";
import './styles/app.css';
import Footer from "./components/footer/Footer";
import Header from './components/header/Header';
import LoginPage from "./components/loginPage/LoginPage";
import {
  Route,
  Routes,
} from 'react-router-dom';
import NotFound from "./components/NotFound";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import LoaderPage from "./components/ui/LoaderPage";
import AuPageLayout from "./components/authorized/AuPageLayout";
import ChangePass from "./components/authorized/users/ChangePass";


const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [changePasswordFlag, setChangePasswordFlag] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        if(data != null){
          user.setUser(data.data)
          user.setIsAuth(true)
          if(data.data.flag == 1){
            setChangePasswordFlag(true)
          }
        }
      }).catch(error => {
      console.error("Check error:", error);
    }).finally(() => setLoading(false))
    }, 0)
  }, [])

  return (
    <div className="App">
      {loading ? <LoaderPage /> : ''}
      <Header loadingPageStatus={loading}/>
      <Routes>
        <Route path="/" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'me'} /> : <LoginPage loadingPageStatus={loading} />)} />
        <Route path="/login" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : <LoginPage loadingPageStatus={loading} />} />
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/storages" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'storages'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/storages/:action" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'storages'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/storages/:action/:storageId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'storages'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        <Route exact path="/incidents" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'incidents'} /> : <NotFound loadingPageStatus={loading} />)} />
        <Route exact path="/incidents/:pageId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'incidents'} /> : <NotFound loadingPageStatus={loading} />)} />
        <Route exact path="/incidents/id/:incidentId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'incidents'} /> : <NotFound loadingPageStatus={loading} />)} />
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/patterns" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'patterns'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/patterns/:action" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'patterns'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/patterns/:action/:patternId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'patterns'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        <Route exact path="/me" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'me'} /> : <NotFound loadingPageStatus={loading} />)} />
        <Route exact path="/users" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'users'} /> : <NotFound loadingPageStatus={loading} />)} />
        <Route exact path="/users/:pageId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'users'} /> : <NotFound loadingPageStatus={loading} />)} />
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/items" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'items'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        { user.user['access'] != 2 || user.user['status'] > 3  ? <Route exact path="/items/:pageId" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'items'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        {user.user['status'] >= 4 ? <Route exact path="/links" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'links'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        {user.user['status'] === 5 ? <Route exact path="/settings" element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : (user.isAuth ? <AuPageLayout loadingPageStatus={loading} type={'settings'} /> : <NotFound loadingPageStatus={loading} />)} /> : null}
        <Route path='*' element={changePasswordFlag ? <ChangePass setChangePasswordFlag={setChangePasswordFlag}/> : <NotFound loadingPageStatus={loading} />} />
      </Routes>
      <Footer />
    </div>
  );  
})

export default App;
