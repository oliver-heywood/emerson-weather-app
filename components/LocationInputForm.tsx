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
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">How would you like to check the weather?</label>
                    <select 
                        name="type" 
                        id="type" 
                        onChange={handleSelectChange}
                        className="form-select"
                    >
                        <option selected value="CITY_NAME">By City Name</option>
                        <option value="ZIP">By Zip Code</option>
                        <option value="COORDINATES">By Latitude and Longitude</option>
                    </select>
                </div>
                { locationInputType === "CITY_NAME" && 
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City Name:</label>
                        <input 
                            id="city" 
                            name="q" 
                            type="text" 
                            value={location.q} 
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        ></input>
                    </div>
                }
                { locationInputType === "ZIP" && 
                    <div className="mb-3">
                        <label htmlFor="zip" className="form-label">Zip Code:</label>
                        <input 
                            id="zip" 
                            name="zip" 
                            type="number" 
                            value={location.zip} 
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        ></input>
                    </div>
                }                
                { locationInputType === "COORDINATES" && 
                <div className="mb-3 row">
                    <div className="col"> 
                        <label htmlFor="latitude" className="form-label">Latitude:</label>
                        <input 
                            id="latitude" 
                            name="lat" 
                            type="number" 
                            value={location.lat} 
                            onChange={handleInputChange}
                            max="90"
                            min="-90"
                            required
                            className="form-control"
                        ></input>
                    </div>
                    <div className="col"> 
                        <label htmlFor="longitude" className="form-label">Longitude:</label>
                        <input 
                            id="longitude" 
                            name="lon" 
                            type="number" 
                            value={location.lon} 
                            onChange={handleInputChange}
                            max="180"
                            min="-180"
                            required
                            className="form-control"
                        ></input>
                    </div>
                </div>
            }
            <button type="submit" className="btn btn-primary">Check Weather!</button>
            </form>
        </div>
    )
}

export default LocationInputForm;