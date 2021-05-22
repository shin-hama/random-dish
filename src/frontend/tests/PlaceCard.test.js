import axios from 'axios'
import React from 'react'
import renderer from 'react-test-renderer'
import PlaceCard from '../PlaceCard'

jest.mock('axios')
const result = {
  url: 'url',
  name: 'name',
  photos: [{ photo_reference: 'ref' }],
  result: 'result',
}
axios.get.mockResolvedValue({ data: result })

describe('Full data card', () => {
  const place = {
    name: 'all',
    rating: 4.1,
    id: 'ChIJk5YrvHXkGGAROrj6GB7yETQ',
  }

  it('test failed api', async () => {
    const component = renderer.create(<PlaceCard place={place} id={1} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
