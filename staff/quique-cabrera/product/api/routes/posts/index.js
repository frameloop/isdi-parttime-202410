import { Router } from 'express'
import { createPostHandler, getPostsHandler, deletePostHandler, toggleLikePostHandler, updatePostTextHandler } from './handlers/index.js'
import jsonBodyParser from '../../middlewares/jsonBodyParser.js'

const router = new Router()

router.get('/', getPostsHandler)

router.post('/', jsonBodyParser, createPostHandler)

router.delete('/:postId', deletePostHandler)

router.patch('/:postId/likes', toggleLikePostHandler)

router.patch('/:postId/text', jsonBodyParser, updatePostTextHandler)

export default router