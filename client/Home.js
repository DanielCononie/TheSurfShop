import HomeNavbar from "./navbars/HomeNavbar";
import './App.css'
import Turtle from './turtle.png';
import Manatee from './manatee.png'


function Home() {
    return(
        <div className="Home">
            <HomeNavbar />
            <div className="home-content">
                <div className="home-content1">
                    <h3>Welcome to our online store!</h3>
                    <p>
                    Introducing "SeaLyfe Surf Shop," a one-of-a-kind surf retail store on a 
                    mission to make a positive impact on our ocean's wildlife. At SeaLyfe, 
                    we are dedicated to the preservation and protection of beach wildlife 
                    and the marine ecosystem. Our commitment is reflected in our pledge to 
                    donate 2% of all sales to organizations working tirelessly to safeguard 
                    our coastal environments. SeaLyfe Surf Shop is not just a place to find 
                    top-quality surf products; it's a community of ocean enthusiasts coming 
                    together to protect the world beneath the waves. With every purchase you 
                    make at SeaLyfe, you are contributing to the conservation efforts that 
                    ensure the well-being of marine life. Let's embark on this journey together, 
                    riding the tides of change, and championing a sustainable future for our oceans 
                    and the incredible creatures they support. Together, we can create a sea life 
                    that thrives for generations to come.
                    </p>
                </div>
                <div className="home-content2">
                    <img src={Turtle}/>
                    <img src={Manatee} />
                </div>
            </div>
        </div>
    )
}

export default Home;