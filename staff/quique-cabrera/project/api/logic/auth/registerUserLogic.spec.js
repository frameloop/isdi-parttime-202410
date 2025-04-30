import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import registerUserLogic from './registerUserLogic.js'
import { User, Photographer } from '../../data/models.js'

describe('registerUserLogic', () => {
    let originalConsoleError;

    before(() => {
        originalConsoleError = console.error;
        console.error = () => { }; // Silencia los errores
    });

    after(() => {
        console.error = originalConsoleError; // Restaura el comportamiento original
    });

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
        await Photographer.deleteMany({})
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should register a new customer successfully', async () => {
        const result = await registerUserLogic(
            'Alice Test',
            'alicetester',
            'alice@test.com',
            'SecurePass123!',
            '+34123456789',
            'customer'
        )

        expect(result).to.have.property('id')
        expect(result.name).to.equal('Alice Test')
        expect(result.username).to.equal('alicetester')
        expect(result.email).to.equal('alice@test.com')
        expect(result.role).to.equal('customer')

        const userInDb = await User.findOne({ email: 'alice@test.com' })
        expect(userInDb).to.exist
        expect(userInDb.role).to.equal('customer')
    })

    it('should register a new photographer with coverage area, bio and portfolio', async () => {
        const result = await registerUserLogic(
            'Bob Lens',
            'boblens',
            'bob@lens.com',
            'CameraPass456!',
            '+34666555444',
            'photographer',
            'Barcelona',
            'Professional portrait photographer',
            ['https://portfolio.com/img1.jpg']
        )

        expect(result).to.have.property('id')
        expect(result.coverage_area).to.equal('Barcelona')
        expect(result.bio).to.include('portrait')

        const photographerInDb = await Photographer.findOne({ coverage_area: 'Barcelona' }).populate('user')
        expect(photographerInDb).to.exist
        expect(photographerInDb.user.email).to.equal('bob@lens.com')
    })

    it('should return error object if email already exists', async () => {
        await registerUserLogic(
            'Carol Repeat',
            'carolr',
            'carol@repeat.com',
            'Repeat123!',
            '+34777777777',
            'customer'
        )

        const result = await registerUserLogic(
            'Carol Again',
            'carolr2',
            'carol@repeat.com',
            'AnotherPass123!',
            '+34888888888',
            'customer'
        )

        expect(result).to.have.property('error')
        expect(result.error).to.have.property('error', 'DuplicityError')
        expect(result.error).to.have.property('message', 'User already exists')
        expect(result).to.have.property('status', 409)
    })

})
