import { PhotographIcon, UserIcon } from '@heroicons/react/outline'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typing'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>('')
  const [username, setUsername] = useState<string|null>()
  const [userImage, setUserImage] = useState<string|null>()
  const [image, setImage] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const userImageInputRef = useRef<HTMLInputElement>(null)

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
  const [userInfoBoxIsOpen, setuserInfoBoxIsOpen] = useState<boolean>(false)

  const addImageToTweet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false)
  }
  const addUsernameToTweet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!usernameInputRef.current?.value) return

    localStorage.setItem('username', usernameInputRef.current.value)
    setUsername(localStorage.getItem('username'))
    usernameInputRef.current.value = ''
    if(userImage){
    setuserInfoBoxIsOpen(false)}
  }
  const addUserImageToTweet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!userImageInputRef.current?.value) return

    localStorage.setItem('userImage', userImageInputRef.current.value)
    setUserImage(localStorage.getItem('userImage'))
    userImageInputRef.current.value = ''
    if(username){
      setuserInfoBoxIsOpen(false)}
  }
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: username!==undefined?username:'Guest',
      profileImg: userImage||'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast.success('Tweet Posted', {
      icon: '✔',
    })
    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
  }
   
  useEffect(() => {
    if(!localStorage.getItem('username')){
    localStorage.setItem('username', "Guest")}else{
      setUsername(localStorage.getItem('username'))
    }
    if(!localStorage.getItem('userImage')){
    localStorage.setItem('userImage', "https://links.papareact.com/gll")
    }else{
      setUserImage(localStorage.getItem('userImage'))
    }
  }, [])
  
  return (
    <div className="flex space-x-2 p-5">
        <img
          src={userImage||'https://links.papareact.com/gll'}
          className="mt-4 h-14 w-14 rounded-full object-cover"
          alt=""
        />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            onChange={(e) => {
              setInput(e.target.value)
            }}
            value={input}
            type="text"
            placeholder={`What's Happening ${username!==undefined?username:'Guest'}?`}
            className="placeholder-text-gray-600 h-24 w-full bg-transparent text-xl text-black outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="inline h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <UserIcon
                onClick={() => setuserInfoBoxIsOpen(!userInfoBoxIsOpen)}
                className="inline h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-opacity-70"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-black outline-none placeholder:text-black"
                type="text"
                placeholder="Enter image Url..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {userInfoBoxIsOpen && (
            <div>
              <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                <input
                  ref={usernameInputRef}
                  className="flex-1 bg-transparent p-2 text-black outline-none placeholder:text-black"
                  type="text"
                  placeholder="Enter your username"
                />
                <button
                  type="submit"
                  onClick={addUsernameToTweet}
                  className="font-bold text-white"
                >
                  Post with this username
                </button>
              </form>
              <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                <input
                  ref={userImageInputRef}
                  className="flex-1 bg-transparent p-2 text-black outline-none placeholder:text-black"
                  type="text"
                  placeholder="Profile picture image url"
                />
                <button
                  type="submit"
                  onClick={addUserImageToTweet}
                  className="font-bold text-white"
                >
                  Add this a profile Image
                </button>
              </form>
            </div>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
