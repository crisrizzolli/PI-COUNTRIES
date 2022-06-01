import React from 'react'
import styles from './LandingPage.module.css'
import {Link} from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className={styles.landing}>
        
        <div className={styles.container}>
            <Link to='/home'>
        <button className={styles.buttonIng}>Start</button>
      </Link>
        </div>
    </div>
    
    
  )
}

export default LandingPage