import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { Tweet } from '../typing'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto   max-h-screen  lg:max-w-6xl">
      <Head>
        <title>Twitter 2.0</title>
        <meta name="description" content="Twitter clone" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-9 ">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed tweets={tweets} />

        
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()

  return {
    props: { tweets },
  }
}
