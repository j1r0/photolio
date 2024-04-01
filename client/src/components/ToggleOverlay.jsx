import React from 'react'

function ToggleOverlay() {
    let overlayDiv = document.querySelector(".overlay");
    if (overlayDiv) {
      console.log(overlayDiv.style.opacity);
      if (overlayDiv.style.opacity === '0')
          overlayDiv.style.opacity = 1;
      else
          overlayDiv.style.opacity = 0;
    }

    return (
        <div>
            <div className="overlay" style={{ overlayDiv }}>Overlay</div>
            <br />
            <div>
                <button onClick={ToggleOverlay}>Show/Hide Overlay</button>
            </div>
        </div>
    )
}


export default ToggleOverlay