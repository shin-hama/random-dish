import React from 'react'
import renderer from 'react-test-renderer'
import CardList from '../CardList'

test('Empty card list', () => {
  const component = renderer.create(<CardList />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Update places', () => {
  const places = [
    { name: 'only' },
    {
      name: 'all',
      photos: ['1', '2', '3'],
      rating: 4.1,
      url: 'dummy/path.html',
    },
  ]
  let component = null
  renderer.act(() => {
    component = renderer.create(<CardList places={places} />)
  })
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  renderer.act(() => {
    component.update(<CardList places={places.reverse()} />)
  })
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
