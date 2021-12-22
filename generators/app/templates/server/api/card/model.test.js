import { Card } from '.'

let card

beforeEach(async () => {
  card = await Card.create({ name: 'test', desc: 'test', details: 'test', image: 'test', avatar: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = card.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(card.id)
    expect(view.name).toBe(card.name)
    expect(view.desc).toBe(card.desc)
    expect(view.details).toBe(card.details)
    expect(view.image).toBe(card.image)
    expect(view.avatar).toBe(card.avatar)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = card.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(card.id)
    expect(view.name).toBe(card.name)
    expect(view.desc).toBe(card.desc)
    expect(view.details).toBe(card.details)
    expect(view.image).toBe(card.image)
    expect(view.avatar).toBe(card.avatar)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
