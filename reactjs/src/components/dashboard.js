import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import Card from 'react-bootstrap/Card';
export default function Dashboard() {
    const {http} = AuthUser();
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () =>{
        http.post('/auth/me').then((res)=>{
            setUserdetail(res.data);
        });
    }

    function renderElement(){
        if(userdetail){
            return <div>
                <p><b>Name</b></p>
                <p>{userdetail.name}</p>
                <p><b>Email</b></p>
                <p>{userdetail.email}</p>
            </div>
        }else{
            return <p>Loading.....</p>
        }

    }

    return(
    <div>

        <Card>
        
        <Card.Body>
            <Card.Title>Dashboard page</Card.Title>
            { renderElement() }
        </Card.Body>
        </Card>
    </div>
    )
}