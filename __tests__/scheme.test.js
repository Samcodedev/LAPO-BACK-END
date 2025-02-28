const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const Scheme = require('../models/schemeModel');
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
    username: 'schemetestuser',
    email: 'schemetest@example.com',
    password: hashedPassword
  });
  userId = user._id;

  const loginResponse = await request(app)
    .post('/api/user/login')
    .send({
      username: 'schemetestuser',
      password: 'Password123!'
    });
  token = loginResponse.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Scheme.deleteMany({});
});

describe('Scheme Routes Tests', () => {
  const testScheme = {
    schemeName: 'Test Scheme',
    description: 'Test Description',
    status: 'active'
  };

  describe('POST /api/scheme', () => {
    it('should create a new scheme', async () => {
      const response = await request(app)
        .post('/api/scheme')
        .set('Authorization', `Bearer ${token}`)
        .send(testScheme);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Scheme created successfully');
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/api/scheme')
        .send(testScheme);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/scheme', () => {
    beforeEach(async () => {
      await Scheme.create({ ...testScheme, user: userId });
    });

    it('should get all schemes', async () => {
      const response = await request(app)
        .get('/api/scheme')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
}); 