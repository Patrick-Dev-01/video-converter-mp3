import { useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import { youtube_parser } from './utils';

import './index.css';

interface VideoLink{
  duration: number;
  link: string;
  msg: string;
  progress: number;
  status: string;
  title: string;
}

function App() {
  const inputUrlRef = useRef<HTMLInputElement>(null);
  const [videoLink, setVideoLink] = useState<VideoLink>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const youtubeId = youtube_parser(inputUrlRef.current?.value);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: { id: youtubeId },
    }

    axios(options).then(response => {
      setVideoLink(response.data);
    }).catch(err => {
      console.log(err)
    });
  }

  return (
     <div className="app">
      <span className='logo'>youtube2mp3</span>
      <section className='content'>
        <h1 className='content_title'>Youtube to MP3 Converter</h1>
        <p className='content_description'>
          TransForm Youtube Videos into MP3's in just few clicks!
        </p>

        <form className='form' onSubmit={handleSubmit} action="">
          <input ref={inputUrlRef} placeholder='Paste a Youtube video URL link...' className='form_input' type="text" />
          <button type='submit' className='form_button'>Search</button>
        </form>

        { videoLink ? <a target='_blank' rel='noreferrer' href={videoLink.link} className='donwload_btn'>Download MP3</a> : <></> }
      </section>
     </div>
  )
}

export default App
