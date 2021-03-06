// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Comment } from '../../typing'

const commentQuery = groq`
 *[_type == "comment" && references(*[_type == 'tweet' && _id == $tweetId]._id)]{
         _id,  
         ...
} | order(_createdAt desc)
`

type Data = Comment[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { tweetId } = req.query

    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
      tweetId,
    })
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(<Data>comments)
  } catch (error) {
    res.status(400).json({ message: 'Not enought information given' })
  }
}
