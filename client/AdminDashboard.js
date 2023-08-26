import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './admin-styles/Admin.css'
import BarChart from "./BarChart";
import {UserData} from './Data'
import BarChartTwo from "./BarChartTwo";


function AdminDashboard() {

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Money donated to wildlife preservation",
                data: UserData.map((data) => data.moneyDonated),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            }
        ],
    });

    const [animalData, setAnimalData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Animals saved",
                data: UserData.map((data) => data.animalsSaved),
                backgroundColor: "blue",
            }
        ],
    });

    return (
        <div className="AdminDashboard">
            <div className="dashboard-1">
               <p>
                "Let us emulate the noble spirit of our 
                ancestors, who believed in the interconnectedness 
                of all living beings and pledged their abundance to 
                protect the wonders of the seas, ensuring a bountiful 
                legacy for future generations and thriving sea life alike."
                </p>
                <hr style={{backgroundColor: 'black', width: '100%', color: 'black'}}/>
            </div>

            <div className="dashboard-2">
                <Link to='/AddProduct' className="admin-links" >Add Product</Link>
                <Link to='/' className="admin-links">Delete Product</Link>
                
            </div>

        

            <div className="charts">
                <div className="chart-container">
                    <BarChart chartData={userData} className='charts'/>
                    
                </div>
                <div className="chart-container">
                    <BarChartTwo chartData={animalData} className='charts'/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;