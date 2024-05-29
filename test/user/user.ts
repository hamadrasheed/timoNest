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

  const newUser = {
    userName: 'test_new_22',
    // this email should be a correct email to test the forgot password
    email: 'user@mail.com',
    password: 'ab@12345',
    roleSlug: 'carrier_admin'
  };

  async function signUpUser() {
    const response = await request(app.getHttpServer())
      .post('/user/sign-up')
      .send(newUser);
 
    expect(response.statusCode).to.equal(HttpStatus.OK);
    expect(response.body.message).to.equal('success');
    expect(response.body.result).to.equal('User created successfully!');
  }

  async function loginUser() {
    const loginData = {
      userName: newUser.userName,
      password: newUser.password,
      roleSlug: newUser.roleSlug
    };

    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send(loginData);

    expect(response.status).to.equal(HttpStatus.OK);
    expect(response.body.message).to.equal('success');
    expect(response.body.result).to.have.property('id');
    expect(response.body.result).to.have.property('token');
    authToken = response.body.result.token;
    userId= response.body.result.id;
  }

  async function forgotPassword() {
    const forgotPasswordData = {
      email: newUser.email,
      roleSlug: newUser.roleSlug
    }

    const response = await request(app.getHttpServer())
      .post('/user/forgot-password')
      .send(forgotPasswordData);
    
    expect(response.status).to.equal(HttpStatus.OK);
    expect(response.body.message).to.equal('success');
    expect(response.body.result).to.equal('A reset password email has been sent, its valid for only 30 minutes.');
  }
  async function resetPassword() {
    const resetPasswordData = {
      userId: userId, 
      oldPassword: newUser.password,
      newPassword: 'new_password1'
    };

    const response = await request(app.getHttpServer())
      .put('/user/reset-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send(resetPasswordData);

    expect(response.status).to.equal(HttpStatus.OK);
    expect(response.body.message).to.equal('success');
    expect(response.body.result).to.equal("User's password updated successfully!");
  }

  it('should sign up a new user', async () => {
    await signUpUser();
  });

  it('should login with the newly created user', async () => {
    await loginUser();
  });

  it('should forget the password for the newly created user', async () => {
    await forgotPassword();
  })

  it('should reset password for the logged-in user', async () => {
    await resetPassword();
  });
});
