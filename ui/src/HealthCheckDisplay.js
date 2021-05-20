import axios from 'axios'
import React, { useState } from 'react';

function HealthChecker() {

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    axios.get('http://localhost:8888/healthcheck')
      .then(function (response) {
        console.log(response);
        setCount(1)
      })
      .catch(function (error) {
        console.log(error);
      })

    return (
        <div>HEALTH CHECKER {count}</div>
    )
}

export default HealthChecker