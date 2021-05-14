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

// test('Change to next photo to last', () => {
//   const place = {
//     name: 'all',
//     photos: ['1', '2'],
//     rating: 4.1,
//     url: 'dummy/path.html',
//   }
//   const component = renderer.create(<PlaceCard place={place} id={1} />)
//   let tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   // Will change photo
//   component.handleNext()
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   // Will not change photo
//   component.handleNext()
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })

// test('Will not change to previous photo from first', () => {
//   const place = {
//     name: 'all',
//     photos: ['1', '2'],
//     rating: 4.1,
//     url: 'dummy/path.html',
//   }
//   const component = renderer.create(<PlaceCard place={place} id={1} />)
//   let tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   // Will not change photo
//   renderer.act(() => {
//     component.handleBack()
//   })
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })

// test('Change to next and previous photo', () => {
//   const place = {
//     name: 'all',
//     photos: ['1', '2'],
//     rating: 4.1,
//     url: 'dummy/path.html',
//   }
//   const component = renderer.create(<PlaceCard place={place} id={1} />)
//   let tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   // Will change to second photo
//   component.handleNext()
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   // Will change to first photo
//   component.handleBack()
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })
