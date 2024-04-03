import React from 'react';

function Pin(props, photo) {
    const { size }= props;

    return (
        <div
            style={{
                ...styles.pin,
                ...styles[size],
            }}
        >
            <img src= {photo} alt="" />
        </div>
    );
}

const styles = {
    pin: {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
        overflow: 'hidden',
    },
    small: {
        gridRowEnd: 'span 26',
    },
    medium: {
        gridRowEnd: 'span 33',
    },
    large: {
        gridRowEnd: 'span 45',
    },
};

export default Pin;
