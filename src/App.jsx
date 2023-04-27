import React from 'react';
import Hero from './components/Hero';
import ArticleSummarizer from './components/ArticleSummarizer';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient'/>
      </div>

      <div className='app'>
        <Hero />
        <ArticleSummarizer />
        <Footer />
      </div>
    </main>
  )
}

export default App