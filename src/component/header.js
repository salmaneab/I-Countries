import React, {useState, useEffect} from 'react';

function Header() {
    let [toggle, setToggle] = useState(false);

    useEffect(()=>{
        //Make sure The Dark theme Stand in All pages
        if(localStorage.getItem('data-theme') === "light"){
            setToggle(false)
            document.documentElement.setAttribute('data-theme', "light");
        }else if(localStorage.getItem('data-theme') === "dark"){
            setToggle(true);
            document.documentElement.setAttribute('data-theme', "dark");
        }else{
            setToggle(true)
            document.documentElement.setAttribute('data-theme', "dark");
        }
    },[toggle])
    return (
        <div className="header">
                <div className="container">
                    <div className="header-container">
                        <div className="logo">
                            <h2 data-test="Hello World" >Where in the world?</h2>
                        </div>
                        <div className="dark-mode-btn" onClick={()=>{
                            //Make sure The Dark theme Stand in All pages By using The localStorage
                            if(document.documentElement.getAttribute('data-theme') === "dark"){
                                setToggle(false);
                                localStorage.setItem('data-theme','light');
                                document.documentElement.setAttribute('data-theme', "light");
                            }else{
                                setToggle(true);
                                localStorage.setItem('data-theme','dark');
                                document.documentElement.setAttribute('data-theme', "dark");
                            }
                        }}>
                            <div className={toggle ? "squere dark" : "squere"}></div>
                            <i className="fas fa-moon" id="moon"></i>
                            <i className="fas fa-sun" id="sun"></i>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Header;
