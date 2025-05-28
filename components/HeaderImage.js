import React from 'react';
import Link from 'next/link';
import config from "../config.json";
import styles from '../styles/Home.module.css';

const HeaderImage = () => (
    <div className={styles.headerContainer}>
        <Link href={config.components.HeaderImage.homepage_url}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <img
                    src={config.components.HeaderImage.logo_url}
                    alt={config.components.HeaderImage.logo_url}
                    style={{ width: config.components.HeaderImage.logo_width, color: config.components.HeaderImage.logo_color }}
                /> */}
                <div className={styles.logoText}>
                        <h1>
                        APUNTES <span className={styles.logoHighlight}>UDA</span>
                        </h1>
                    <p>Por y para los estudiantes</p>
                </div>

                <h1 style={{ margin: '0 10px' }}>{config.components.HeaderImage.title}</h1>
            </div>
        </Link>
    </div>
);

export default HeaderImage;
