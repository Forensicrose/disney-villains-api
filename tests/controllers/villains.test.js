const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { villainList, singleVillain } = require('../mocks/villains')
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


  describe('villainBySlug', () => {
    it('retrieves and returns the villain associated with the provided slug from the database', async () => {
      const request = { params: { slug: 'gaston' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.scaryVillains, 'findOne').returns(singleVillain)

      await villainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gaston' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })


  describe('newVillain', () => {})
})
