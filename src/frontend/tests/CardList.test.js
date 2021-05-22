import axios from 'axios'
import React from 'react'
import renderer from 'react-test-renderer'
import CardList from '../CardList'

jest.mock('axios')
const result = {
  url: 'url',
  name: 'name',
  photos: [{ photo_reference: 'ref' }],
  result: 'result',
}
axios.get.mockResolvedValue({ data: result })

describe('Empty card list', () => {
  it('no places test', () => {
    const component = renderer.create(<CardList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Update places', () => {
  const places = [
    {
      name: 'all',
      rating: 4.1,
      id: 'ChIJk5YrvHXkGGAROrj6GB7yETQ',
    },
    {
      name: 'all',
      rating: 4.1,
      id: 'ChIJk5YrvHXkGGAROrj6GB7yETQ',
    },
  ]
  it('Update 1 time', () => {
    const component = renderer.create(<CardList places={places} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    renderer.act(() => {
      component.update(<CardList places={places.reverse()} />)
    })
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
