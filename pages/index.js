import Head from 'next/head'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import HeaderImage from '../components/HeaderImage';
import GoogleDriveSearch from '../components/GoogleDriveSearch'
import SimpleSignOn from '../components/SimpleSignOn'
import PlayBookFolders from '../components/PlayBookFolders';
import DebugConfig from '../components/DebugConfig';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apuntes UDA</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <SimpleSignOn>
        
        
        <main className={styles.main}>
          <HeaderImage />
          
          <GoogleDriveSearch />

          <PlayBookFolders />

        </main>

      </SimpleSignOn>
    </div>
  )
}
