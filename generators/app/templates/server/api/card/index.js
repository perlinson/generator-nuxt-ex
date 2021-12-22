import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Card, { schema } from './model'

const router = new Router()
const { name, desc, details, image, avatar } = schema.tree

/**
 * @api {post} /cards Create card
 * @apiName CreateCard
 * @apiGroup Card
 * @apiParam name Card's name.
 * @apiParam desc Card's desc.
 * @apiParam details Card's details.
 * @apiParam image Card's image.
 * @apiParam avatar Card's avatar.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 */
router.post('/',
  body({ name, desc, details, image, avatar }),
  create)

/**
 * @api {get} /cards Retrieve cards
 * @apiName RetrieveCards
 * @apiGroup Card
 * @apiUse listParams
 * @apiSuccess {Object[]} cards List of cards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /cards/:id Retrieve card
 * @apiName RetrieveCard
 * @apiGroup Card
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /cards/:id Update card
 * @apiName UpdateCard
 * @apiGroup Card
 * @apiParam name Card's name.
 * @apiParam desc Card's desc.
 * @apiParam details Card's details.
 * @apiParam image Card's image.
 * @apiParam avatar Card's avatar.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 */
router.put('/:id',
  body({ name, desc, details, image, avatar }),
  update)

/**
 * @api {delete} /cards/:id Delete card
 * @apiName DeleteCard
 * @apiGroup Card
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Card not found.
 */
router.delete('/:id',
  destroy)

export default router
