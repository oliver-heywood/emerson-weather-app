import { useState } from "react";

export type LocationInputType = "COORDINATES" | "ZIP" | "CITY_NAME"

export interface LocationInputFormProps {
    onSubmitForm: (query: LocationQuery) => void;
}

export interface LocationQuery {
    q?: string;
    zip?: number;
    lat?: number;
    lon?: number;
}

const LocationInputForm = (props: LocationInputFormProps) => {
    const { onSubmitForm } = props;
    
    const [locationInputType, setLocationInputType] = useState<LocationInputType>("CITY_NAME");
    const [location, setLocation] = useState<LocationQuery>({});
    
    const handleInputChange = (e: any) => {
        let field = e.target.name;
        let value = e.target.value;
        if (field === "zip" || field === "lat" || field === "lon") {
            value = Number(value);
        } 
        setLocation({...location, [field]: value })
    }

    const handleSelectChange = (e: any) => {
        setLocationInputType(e.target.value as LocationInputType);
        setLocation({});
        e.preventDefault();
    }

    const handleSubmit = (e: any) => {
        onSubmitForm(location);
        e.preventDefault();
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">How would you like to check the weather?</label>
                <select name="type" id="type" onChange={handleSelectChange}>
                    <option selected value="CITY_NAME">By City Name</option>
                    <option value="ZIP">By Zip Code</option>
                    <option value="COORDINATES">By Latitude and Longitude</option>
                </select>
                { locationInputType === "CITY_NAME" && 
                    <div>
                        <label htmlFor="city">City Name:</label>
                        <input 
                            id="city" 
                            name="q" 
                            type="text" 
                            value={location.q} 
                            onChange={handleInputChange}
                            required
                        ></input>
                    </div>
                }
                { locationInputType === "ZIP" && 
                    <div>
                        <label htmlFor="zip">Zip Code:</label>
                        <input 
                            id="zip" 
                            name="zip" 
                            type="number" 
                            value={location.zip} 
                            onChange={handleInputChange}
                            required
                        ></input>
                    </div>
                }                
                { locationInputType === "COORDINATES" && 
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input 
                        id="latitude" 
                        name="lat" 
                        type="number" 
                        value={location.lat} 
                        onChange={handleInputChange}
                        max="90"
                        min="-90"
                        required
                    ></input>
                    <label htmlFor="longitude">Longitude:</label>
                    <input 
                        id="longitude" 
                        name="lon" 
                        type="number" 
                        value={location.lon} 
                        onChange={handleInputChange}
                        max="180"
                        min="-180"
                        required
                    ></input>
                </div>
            }
            <button type="submit">Check Weather!</button>
            </form>
        </div>
    )
}

export default LocationInputForm;