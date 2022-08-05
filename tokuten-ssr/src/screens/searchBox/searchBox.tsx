import React, { useState } from 'react'
import * as images from '../images'
import "./searchBox.css";

const SearchBox = ({onQueryChange}: any) => {
    const [isToggleCreator, setIsToggleCreator] = useState(true);

    const onClickSearchIcon = () => {
        setIsToggleCreator(false);
    }

    return (
        <div>
            <div className="mobsearch">
                <div className="mobsearchcontainer">
                    {isToggleCreator && 
                        <p className="overlapimg">
                            <img src={images.mobheader1} className="headerimg" />
                            <img src={images.mobheaderimg} className="headerimg mobsecondimg" />
                            <img src={images.mobheaderimg3} className="headerimg mobsecondimg" />
                            <br /><span>creator shops</span>
                        </p>
                    }
                    <div className="searchcontainer">
                        <img src={images.mobinputcrose} />
                        <input
                            id="search-bar"
                            type="text"
                            className="form-control mobsearchinput"
                            aria-describedby="Search"
                            onChange={onQueryChange}
                            placeholder="search creator or shop"
                        />
                    </div>
                    <p className="mobsearchimg">
                        <img src={images.mobsearch} className="searchimg" onClick={onClickSearchIcon} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;
