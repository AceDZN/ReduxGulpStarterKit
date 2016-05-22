import expect from 'expect'
import * as actions from '../../src/js/actions/index'

describe('actions', () => {
  it('action should get ReactJS object', () => {
    const platform = {title: 'ReactJS'};
    const expectedAction = {
      type: 'PLATFORM_SELECTED',
      payload: platform
    }
    expect(actions.selectPlatform(platform)).toEqual(expectedAction)
  });
  it('action should get Redux object', () => {
    const platform = {title: 'Redux'};
    const expectedAction = {
      type: 'PLATFORM_SELECTED',
      payload: platform
    }
    expect(actions.selectPlatform(platform)).toEqual(expectedAction)
  })
  it('action should get Gulp object', () => {
    const platform = {title: 'Gulp'};
    const expectedAction = {
      type: 'PLATFORM_SELECTED',
      payload: platform
    }
    expect(actions.selectPlatform(platform)).toEqual(expectedAction)
  })
})
