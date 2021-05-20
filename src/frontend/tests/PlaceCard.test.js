import React from 'react'
import renderer from 'react-test-renderer'
import PlaceCard from '../PlaceCard'

test('Full data card', () => {
  const place = {
    name: 'all',
    rating: 4.1,
    id: '0',
  }
  const component = renderer.create(<PlaceCard place={place} id={1} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
