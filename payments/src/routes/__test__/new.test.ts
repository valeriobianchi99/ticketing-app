import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@sgtickets/common";

it('returns a 404 when purchasing an order that does not exist', async() => {
    await request(app).post('/api/payments').set('Cookie', global.signin()).send({
        token: 'dk38hr2i39',
        orderId: new mongoose.Types.ObjectId().toHexString()
    }).expect(404)
});

it('returns a 401 when purchasing an order that does not belong to the user', async() => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        price: 20
    });
    await order.save();
    await request(app).post('/api/payments').set('Cookie', global.signin()).send({
        token: 'dk38hr2i39',
        orderId: order.id
    }).expect(401)
});

it('returns a 400 when purchasing a cancelled order', async() => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        status: OrderStatus.Cancelled,
        price: 20
    });
    await order.save();
    await request(app).post('/api/payments').set('Cookie', global.signin(userId)).send({
        token: 'dk38hr2i39',
        orderId: order.id
    }).expect(400)
});