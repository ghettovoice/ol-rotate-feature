/* global expect, describe, it */
import { assert, coalesce, uniqId } from '../../../src/util'

describe('util tests', () => {
  /** @test assert */
  describe('assert', () => {
    it('should throw on false condition', () => {
      expect(() => assert(false, 'False condition')).to.throw(Error, /false condition/i)
    })

    it('should not throw on true condition', () => {
      let err = false
      assert(true, 'Should not throw')

      expect(err).to.be.false
    })
  })

  /** @test coalesce */
  describe('coalesce', () => {
    it('should return first defined valued', () => {
      expect(coalesce(undefined, null, 0)).to.be.equal(0)
      expect(coalesce('qwe', null)).to.be.equal('qwe')
      expect(coalesce()).to.be.undefined
    })
  })

  /** @test uniqId */
  describe('uniqId', () => {
    describe('without prefix', () => {
      it('should increment in default namespace', () => {
        expect(uniqId()).to.be.equal('1')
        expect(uniqId()).to.be.equal('2')
        expect(uniqId()).to.be.equal('3')
      })
    })

    describe('with prefix', () => {
      it('should increment in namespace', () => {
        expect(uniqId('first-')).to.be.equal('first-1')
        expect(uniqId('first-')).to.be.equal('first-2')
        expect(uniqId('first-')).to.be.equal('first-3')

        expect(uniqId('second-')).to.be.equal('second-1')
        expect(uniqId('second-')).to.be.equal('second-2')
        expect(uniqId('second-')).to.be.equal('second-3')
      })
    })
  })
})
