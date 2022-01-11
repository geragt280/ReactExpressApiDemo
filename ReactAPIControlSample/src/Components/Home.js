import React from 'react'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';

const cookies = new Cookies();

export default function Home() {

    const history = useHistory();
    function logout(){
        cookies.set("loginuseremail", "", {path:'/'});
        history.push('/')
    }

    const user = cookies.get("loginuseremail");
    return (
        <div>
            <h1>
                Home Page
            </h1>
            <h4>Welcome User {user}</h4>
            <button onClick={ () => logout()} > Logout </button>
        </div>
    )
}
