const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const Card = require('../models/cardModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Create a test user and get token
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  const user = await User.create({
    username: 'cardtestuser',
    email: 'cardtest@example.com',
    password: hashedPassword
  });
  userId = user._id;

  const loginResponse = await request(app)
    .post('/api/user/login')
    .send({
      username: 'cardtestuser',
      password: 'Password123!'
    });
  token = loginResponse.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Card.deleteMany({});
});

describe('Card Routes Tests', () => {
  const testCard = {
    cardName: 'Test Card',
    cardScheme: 'Verve',
    description: 'Test Description',
    binPrefix: '123456',
    currency: 'NGN'
  };

  describe('POST /api/card', () => {
    it('should create a new card', async () => {
      const response = await request(app)
        .post('/api/card')
        .set('Authorization', `Bearer ${token}`)
        .send(testCard);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Card created successfully');
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/api/card')
        .send(testCard);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/card', () => {
    beforeEach(async () => {
      await Card.create({ ...testCard, user: userId });
    });

    it('should get all cards', async () => {
      const response = await request(app)
        .get('/api/card')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
}); 