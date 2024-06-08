import React, { useContext, useEffect } from "react";
import LoginModal from "./LoginModal";
import { Context } from "../..";

function LoginPage(props){

    useEffect(() => {
      document.title = 'EmergencyLogiApp';
    }, []);

    const {user} = useContext(Context)

    let loading = props.loadingPageStatus

    return(
        <main className="pt-3">
            {user.isAuth || loading
            ? ""
            :<LoginModal />}
        </main>
    );
}

export default LoginPage;