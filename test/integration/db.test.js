import request from 'supertest';
import app from '../../api/app.js';

describe('GET /healthz', () => {
    it('should return status 200', async () => {
      const response = await request(app).get('/healthz');
  
      expect(response.status).toBe(200);
    });
});