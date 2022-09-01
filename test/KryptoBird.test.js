const {assert} = require('chai')

const KryptoBird = artifacts.require('./KryptoBird')

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (account) => {
    let contract

    // test container - describe
    describe('deployment', async() => {
        // test samples with writing it
        it('deploys successfully', async() => {
            contract = await KryptoBird.deployed()
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
    })
})