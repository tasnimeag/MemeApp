import React, { useEffect, useState } from 'react'
export default function Main() {
  const [meme,setMeme]=useState({
    topText:"",
    bottomText:"",
    randomImage:"https://i.imgflip.com/30b1gx.jpg"
  })
  
    const[allMemeImages,setAllMemeImages]=useState([]);
    useEffect(()=>{
      async function getMemes(){
        const res= await fetch("https://api.imgflip.com/get_memes")
        const data=await res.json()
        setAllMemeImages(data.data.memes)
      }
      getMemes();
    },[])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);
        const l=allMemeImages[randomNumber].url
        setMeme(prevValues=>({
          ...prevValues,
          randomImage: l
        }))
  }
  function handleChange(event){
    const {name, value}=event.target
    setMeme((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  
  return (
    <div className='formulaire'>
      <input 
       type="text" 
       className='form-input' 
       placeholder='Top text' 
       onChange={handleChange}
       value={meme.topText}
       name="topText"
       />
        <input 
        type="text" 
        className='form-input'
        placeholder='Bottom text'
        onChange={handleChange}
        value={meme.bottomText}
        name="bottomText"
        />
        <br/>
        <button onClick={getMemeImage}>Get a new meme image</button>
      <div className='meme'>
        <img src={meme.randomImage} className='image'/>   
        <h2 className="meme--text top">{meme.topText}</h2> 
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>    
      </div>
    </div>
  )
}
