import expect from 'expect'
import reducer from '../../src/js/reducers/platforms'

describe('platforms list reducer', () => {
  it('should return platforms list', () => {
    expect(
      reducer()
    ).toEqual(
      [
        {title: 'ReactJS'},
        {title: 'Redux'},
        {title: 'Gulp'}
      ]
    )
  })
})
