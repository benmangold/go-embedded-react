import axios from 'axios'
import React, { useState } from 'react';

function HealthChecker() {

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    axios.get('http://localhost:8888/healthcheck')
      .then(function (response) {
        sleep(2000).then((resolve, reject) => {
            setCount(1)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    return (
        <div>HEALTH CHECKER {count ? "HEALTHY" : "NOT HEALTHY"}</div>
    )
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default HealthChecker