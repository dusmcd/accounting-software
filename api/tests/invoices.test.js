
const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const { db } = require('../../db/index');

beforeAll(() => {
    return db.sync();
});

afterAll(() => {
    return db.close();
});

describe('POST /api/invoices', () => {
    test('returns an id number as an integer', () => {
        return request.post('/api/invoices')
            .then(res => expect(typeof res.body).toBe('number'))
    });
});