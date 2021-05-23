import {Redirect} from "react-router";
import { Auth } from "aws-amplify";

   export  const Logout = async () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            await Auth.signOut();

            return <Redirect to={"/login"} />

        } catch (error) {
            console.log('error signing out: ', error);
        }
    };


