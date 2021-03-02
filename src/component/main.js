import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Main() {
    //useState Vars
    let [optionsTrigger, setOptionTrigger] = useState(false);
    let [suggetionTrigger, setSuggetionTrigger] = useState(false);
    let [countries, setCountries] = useState([]);
    let [suggetions, setSuggetions] = useState({
        suggetions: []
    });
    let [countiesNames, setCountriesNames] = useState([]);
    let [renderTrigger, setRenderTrigger] = useState(false)

    //UseEffect
    useEffect(()=>{
        axios.get('https://restcountries.eu/rest/v2/alpha?codes=de;us;br;is;af;ax;al;ma').then(res => {
            setCountries(res.data);
            axios.get('https://restcountries.eu/rest/v2/all?fields=name').then(res => {
                setCountriesNames(res.data);
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    },[])
    return (
        <div>
            <div className="main" onClick={()=>{
                setSuggetionTrigger(false)
            }}>
                <div className="container">

                    {/*Search Queries*/}
                    <div className="query">
                        <div className="search">
                            <input type="text" name="query" id="query" placeholder="Search for a country..." onChange={(e)=>{
                                setSuggetionTrigger(true)
                                let regex = new RegExp(`^${e.target.value}`,'i');
                                setSuggetions({
                                    suggetions: countiesNames.filter(item => regex.test(item.name))
                                })
                                if(e.target.value === ""){
                                    setSuggetionTrigger(false)
                                }
                            }} />
                            <div className="search-icon">
                                <i className="fas fa-search"></i>
                            </div>
                            <div className="suggestion" style={{display: suggetionTrigger ? 'block' : 'none'}}>
                                {suggetions.suggetions.map((item,index)=>{
                                    return (
                                        <p key={index} onClick={()=>{
                                            setSuggetionTrigger(false)
                                        }} ><a href={"/country/" + item.name}>{item.name}</a></p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="filter">
                            <div className="options-header" onClick={()=>{
                                setOptionTrigger(!optionsTrigger)
                            }}>
                                <p>Filter by Region</p>
                                {optionsTrigger ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>}
                            </div>
                            <div className="options" style={{display: optionsTrigger ? "block" : "none"}}>
                                <div className="option">
                                    <label htmlFor="option1" onClick={()=>{
                                        setRenderTrigger(true)
                                        axios.get(`https://restcountries.eu/rest/v2/region/africa`).then(res =>{
                                            setCountries(res.data)
                                            setRenderTrigger(false)
                                            setOptionTrigger(false);
                                        }).catch(err => console.log(err))
                                    }}>Africa</label>
                                </div>
                                <div className="option">
                                    <label htmlFor="option2" onClick={()=>{
                                        setRenderTrigger(true)
                                        axios.get(`https://restcountries.eu/rest/v2/region/americas`).then(res =>{
                                            setCountries(res.data)
                                            setRenderTrigger(false)
                                            setOptionTrigger(false);
                                        }).catch(err => console.log(err))
                                    }}>America</label>
                                </div>
                                <div className="option">
                                    <label htmlFor="option3" onClick={()=>{
                                        setRenderTrigger(true)
                                        axios.get(`https://restcountries.eu/rest/v2/region/Asia`).then(res =>{
                                            setCountries(res.data)
                                            setRenderTrigger(false)
                                            setOptionTrigger(false);
                                        }).catch(err => console.log(err))
                                    }}>Asia</label>
                                </div>
                                <div className="option">
                                    <label htmlFor="option4" onClick={()=>{
                                        setRenderTrigger(true)
                                        axios.get(`https://restcountries.eu/rest/v2/region/europe`).then(res =>{
                                            setCountries(res.data)
                                            setRenderTrigger(false)
                                            setOptionTrigger(false);
                                        }).catch(err => console.log(err))
                                    }}>Europa</label>
                                </div>
                                <div className="option">
                                    <label htmlFor="option5" onClick={()=>{
                                        setRenderTrigger(true)
                                        axios.get(`https://restcountries.eu/rest/v2/region/oceania`).then(res =>{
                                            setCountries(res.data)
                                            setRenderTrigger(false)
                                            setOptionTrigger(false);
                                        }).catch(err => console.log(err))
                                    }}>Oceania</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    {renderTrigger ? <div className="loader">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div> : <div className="items">
                        <div className="items-container">
                            {countries.map((country, index)=>{
                                return(
                                    <div className="item" key={index}>
                                        <div className="item-header" style={{backgroundImage: "url("+ country.flag +")"}} >
                                        </div>
                                        <div className="item-content">
                                            <h3><a href={"/country/" + country.name}>{country.name}</a></h3>
                                            <p>Population: <span>{country.population}</span></p>
                                            <p>Region: <span>{country.region}</span></p>
                                            <p>Capital: <span>{country.capital}</span></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Main;
