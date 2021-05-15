import React from 'react'
import renderer from 'react-test-renderer'
import PlaceCard from '../PlaceCard'

test('Empty data card with only name', () => {
  const place = { name: 'test' }
  const component = renderer.create(<PlaceCard place={place} id={2} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Full data card', () => {
  const place = {
    name: 'all',
    photos: ['1', '2', '3'],
    rating: 4.1,
    url: 'dummy/path.html',
  }
  const component = renderer.create(<PlaceCard place={place} id={1} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
