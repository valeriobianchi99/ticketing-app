import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../__mocks__/nats-wrapper';
import { Ticket } from '../../models/ticket';

it('returns a 404 if the provided id does not exist', async() => {
    const customId = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${customId}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(404);
})

it('returns a 401 if the user is not authenticated', async() => {
    const customId = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${customId}`)
        .send({
            title: 'test',
            price: 20
        })
        .expect(401);
})

it('returns a 401 if the user does not own the ticket', async() => {
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(200);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(401);
})

it('returns a 400 if the user provides an invalid title or price', async() => {
    const cookie = global.signin();
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 20
        })
        .expect(200);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 25323,
            price: '98yhbndwkqlf'
        })
        .expect(400);
})

it('updates the ticket provided valid inputs', async() => {
    const cookie = global.signin();
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 20
        })
        .expect(200);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new-title',
            price: 30
        })
        .expect(200);   
})

it('publishes an event', async() => {
    const cookie = global.signin();
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 20
        })
        .expect(200);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new-title',
            price: 30
        })
        .expect(200);   
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})

it('rejects updates if the ticket is reserved', async() => {
    const cookie = global.signin();
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 20
        })
        .expect(200);
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = await Ticket.findById(response.body.id);
    ticket?.set({ orderId });
    await ticket!.save();
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new-title',
            price: 30
        })
        .expect(400); 
})