import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };
    const [message, setMessage] = useState("");
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            Height: '100%',
            width:'100%',
            padding: '20px',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#3b1b47',
            padding:'20px',
            position:'absolute',
            top:'0',
            right:'0',
            left:'0',
            color: '#fff',
        },
        navTitle: {
            margin: 0,
            fontSize: '24px',
        },
        signOutButton: {
            backgroundColor: '#fff',
            textAlign:'center',
            width:'100px',
            height:'50px',
            position:'fixed',
            top:'5px',
            right:'5px',
            color: '#3E1453',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer',
            // fontSize: '16px',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '70px',
            padding: '20px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto', 
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.message);

                setMessage(JSON.stringify(response.data.message));
            })
            .catch((err) => {

                setMessage('Error fetching profile');
            });
    }, []);

    return (
        <div className="profile-container">
            {/* <div>
                { message && Object.keys(JSON.parse(message)).map((key) => (
                    <p key={key}>{key} : {JSON.parse(message)[key]}</p>
                ))}
            </div> */}
            <div style={styles.container}>
                <nav style={styles.navbar}>
                    <h1 style={styles.navTitle}>Dashboard</h1>
                    <button style={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
                </nav>

                <div style={styles.card}>
                    <h2>Welcome, {message && JSON.parse(message)['name']}!</h2>
                    <p><strong>Email:</strong> {message && JSON.parse(message)['email']}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
