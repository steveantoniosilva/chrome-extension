import './App.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';

function App() {
  const [followMe, setFollowMe] = useState('follow me...');
  const [color, setColor] = useState('');
  const [image, setImage] = useState({
    url: '',
  });
  const [verse, setVerse] = useState({
    verse: '',
    text: '',
  });

  useLayoutEffect(() => {
    const controller = new AbortController();
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 200);
      const fetchPixabayAPI = async () => {
        const fetchCall = await fetch(
          'https://pixabay.com/api/?key=31853836-57ef2db860c9500cf46dae1cf&editors_choice=true&orientation=horizontal&image_type=photo&q=mountain&per_page=200&safesearch=true',
          { signal: controller.signal },
        );
        const response = await fetchCall.json();
        setFollowMe('');
        setImage({
          url: response.hits[randomNumber].webformatURL,
        });
        setColor('#555');
      };
      fetchPixabayAPI();
    }, 4222);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setTimeout(() => {
      const fetchBibleApi = async () => {
        const fetchRandomVerse = await fetch(
          `https://labs.bible.org/api/?passage=random&type=json&formatting=plain`,
          { signal: controller.signal },
        );
        const response = await fetchRandomVerse.json();
        setVerse({
          verse: `${response[0].bookname} ${response[0].chapter}:${response[0].verse}`,
          text: response[0].text,
        });
      };
      fetchBibleApi();
    }, 4777);
    return () => controller.abort();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundColor: `${color}`,
      }}
      className='main'>
      <div className='main--content'>
        <p className='typewriter'>{followMe}</p>
        <p className='bibleVerse'>{verse.verse}</p>
        <p className='bibleText'>{verse.text}</p>
      </div>
    </div>
  );
}

export default App;
