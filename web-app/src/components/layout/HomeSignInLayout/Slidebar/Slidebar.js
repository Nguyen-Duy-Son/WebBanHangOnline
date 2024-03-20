import React, { useEffect, useState } from 'react';
import ButBi from '~/assets/images/ButBi-MocKhoa.jpg';
import AoMua from '~/assets/images/AoMua-Du.jpg';
import USB from '~/assets/images/USB.jpg';
function Slidebar() {
    const images = [ButBi, AoMua, USB];
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [imgIndex]);
    return ( 
        <div className="slider w-full flex items-center">
        <div className="slider_img w-full flex items-center justify-center">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={index === imgIndex ? 'visible' : 'hidden'} 
                />
            ))}
        </div>
    </div>
     );
}

export default Slidebar;