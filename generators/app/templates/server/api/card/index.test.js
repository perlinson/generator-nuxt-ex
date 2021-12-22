import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Card } from '.'

const app = () => express(apiRoot, routes)

let card

beforeEach(async () => {
  card = await Card.create({})
})

test('POST /cards 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', desc: 'test', details: 'test', image: 'test', avatar: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.details).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.avatar).toEqual('test')
})

test('GET /cards 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cards/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${card.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(card.id)
})

test('GET /cards/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cards/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${card.id}`)
    .send({ name: 'test', desc: 'test', details: 'test', image: 'test', avatar: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(card.id)
  expect(body.name).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.details).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.avatar).toEqual('test')
})

test('PUT /cards/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', desc: 'test', details: 'test', image: 'test', avatar: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cards/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${card.id}`)
  expect(status).toBe(204)
})

test('DELETE /cards/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
