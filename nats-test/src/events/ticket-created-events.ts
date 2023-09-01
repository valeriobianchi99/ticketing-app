import { Subjects } from "./subjects";

export interface TicketCreatedEventData {
    id: string;
    title: string;
    price: number;
}

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: TicketCreatedEventData;
}