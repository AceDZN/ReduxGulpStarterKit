import expect from 'expect'
import reducer from '../../src/js/reducers/active-platform'

describe('active-platform reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(null)
  })
  it('should return the Selected ReactJS obj as state', () => {
    expect(
      reducer([], {
        type: 'PLATFORM_SELECTED',
        payload: {title: 'ReactJS'}
      })
    ).toEqual(
      {title: 'ReactJS'}
    )
  })
  it('should return the Selected ReactJS obj as state', () => {
    expect(
      reducer([], {
        type: 'PLATFORM_SELECTED',
        payload: {title: 'Redux'}
      })
    ).toEqual(
      {title: 'Redux'}
    )
  })
})
