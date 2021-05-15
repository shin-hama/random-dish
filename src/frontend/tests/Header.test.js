import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../Header'

test('Default header', () => {
  const component = renderer.create(<Header menuIconClicked={() => {}} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
