const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { villainList } = require('../mocks/villains')
const { getVillains, villainBySlug, newVillain } = require('../../controllers/villains')

chai.use(sinonChai)
const { expect } = chai

describe('getting all villains', () => {
  describe('getVillains', () => {
    it('retrieves and returns a list of villains from the database', async () => {
      const stubbedFindAll = sinon.stub(models.scaryVillains, 'findAll').returns(villainList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainList)
    })
  })


  describe('villainBySlug', () => {})
  describe('newVillain', () => {})
})
