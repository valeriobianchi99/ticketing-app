import mongoose from "mongoose";
import { natsWrapper } from "../../__mocks__/nats-wrapper";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import request from "supertest";

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits and order cancelled event", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
