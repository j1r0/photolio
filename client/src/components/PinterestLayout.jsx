import React from 'react'
import Pin from './Pin';

function PinterestLayout(pic) {
  return (
    <div style= {styles.pin_container}>
        <Pin size = 'small'/>
        <Pin size = 'medium'/>

        <Pin size = 'medium'/>
        <Pin size = 'large'/>
        <Pin size = 'small'/>
        <Pin size = 'medium'/>
        <Pin size = 'large'/>
        <Pin size = 'small'/>
        <Pin size = 'small'/>
        <Pin size = 'medium'/>
        <Pin size = 'large'/>
        <Pin size = 'medium'/>
        <Pin size = 'large'/>
    </div>

  )
}

const styles ={
    pin_container:{
        margin: 0,
        padding: 0,
        width: '80vw',
        backgroundColor: 'black',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)',
        gridAutoRows: '10px',
        justifyContent: 'center',

    
    }
}

export default PinterestLayout;

