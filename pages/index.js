import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Weather from '@/components/Weather'
import Spinner from '@/components/Spinner'

export default function Home() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchWeather = async e => {
    e.preventDefault()
    setLoading(true)
    const data = await fetch(url).then(res => res.json())
    setWeather(data)
    setCity('')
    setLoading(false)
  } 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  if (!loading) {
    return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='absolute top-0 right-0 left-0 bottom-0 bg-black/40 z-[1]'/>
      <Image className='object-cover' src='https://images.unsplash.com/photo-1673965391434-71dd7ea34c2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='layout' fill/>

      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10 text-center'>
        <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
          <div>
            <input onChange={e => setCity(e.target.value)} className='bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-white' type="text" placeholder='Search city'/>
          </div>
          <div>
            <button onClick={fetchWeather}><BsSearch size={30} /></button>
          </div>
        </form>
      </div>

      {/* Weather */}

      {weather.main && <Weather data={weather}/>}
    </div>
  )
  } else {
    return <Spinner />
  }
}
