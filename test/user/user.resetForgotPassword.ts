import { describe, it, beforeEach, afterEach } from 'mocha';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { expect } from 'chai';

describe('User Management', () => {
    let app: INestApplication;
    let authToken: string;
    let userId: number; 
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    afterEach(async () => {
      await app.close();
    });

    async function resetForgotPassword() {
        const resetForgotPasswordData = {
          newPassword: 'new@123ab', 
          // this is the token that you received in the mail user after call forgot-password
          resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJpYXQiOjE3MTU3ODgzNDYsImV4cCI6MTcxNTc5MDE0Nn0.ucRwysa_QMJx77CTfHUlEEL1p5GOn8Q'
        };
    
        const response = await request(app.getHttpServer())
          .put('/user/reset-forgot-password')
          .send(resetForgotPasswordData);
    
        expect(response.status).to.equal(HttpStatus.OK);
        expect(response.body.message).to.equal('success');
        expect(response.body.result).to.equal("Password updated successfully!");
    }

    it('should reset the forgot password with the token that you received in the user mail', async () => {
        await resetForgotPassword();
    });

});