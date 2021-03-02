import axios from 'axios';
import React, {useState,useEffect} from 'react';

function Detail(props) {
    let [country, setCountry] = useState("");
    let [trigger, setTrigger] = useState(true);
    useEffect(()=>{
         axios.get(`https://restcountries.eu/rest/v2/name/${props.match.params.name}?fullText=true`).then(res => {
            setCountry(res.data[0])
            setTrigger(false)
        }).catch(err => console.log(err))
    },[props.match.params.name])
    return (
        <div>
            <div className="detail">
                <div className="container">
                    <div className="back-btn">
                        <a href="/">
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    {trigger ? <div className="loader">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div> : <div className="country-info">
                        <div className="country-info-image" style={{backgroundImage: "url("+country.flag+")"}}>

                        </div>
                        <div className="country-info-content">
                            <h2>{country.name}</h2>
                           <div className="country-deatil">
                                <div className="sec1">
                                    <p>Native Name: <span>{country.nativeName}</span></p>
                                    <p>Popilation: <span>{country.population}</span></p>
                                    <p>Region: <span>{country.region}</span></p>
                                    <p>Sub Region: <span>{country.subregion}</span></p>
                                    <p>Capital: <span>{country.capital}</span></p>
                                </div>
                               <div className="sec2">
                                   <p>Top Level Domain: {country.topLevelDomain.map((domain,index) => {
                                        return (
                                            <span key={index}>{domain}</span>
                                        )
                                    })} </p>
                                    <p>Currencies: {country.currencies.map((currencie, index) => {
                                        return(
                                            <span key={index}>{currencie.name}</span>
                                        )   
                                    })} </p>
                                   <p>Languages: {country.languages.map((language, index)=>{
                                        return (
                                            <span key={index}>{language.nativeName}</span>
                                        )
                                    })} </p>
                                </div>
                            </div>
                           <p className="border-countries">Border Countries: {country.borders.map((border,index)=>{
                                return(
                                    <span key={index}>{border}</span>
                                )
                            })} </p>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Detail;
