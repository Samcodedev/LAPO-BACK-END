const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index'); // Update path to your app
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User Routes Tests', () => {
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!'
  };

  describe('POST /api/user/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/user/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should fail with duplicate email', async () => {
      await request(app).post('/api/user/register').send(testUser);
      const response = await request(app)
        .post('/api/user/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('POST /api/user/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      await User.create({
        ...testUser,
        password: hashedPassword
      });
    });

    it('should login successfully', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          username: testUser.username,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Save token for protected route tests
    });

    it('should fail with wrong password', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          username: testUser.username,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });
  });
}); 