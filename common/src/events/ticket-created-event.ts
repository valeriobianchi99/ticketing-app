import { Subjects } from "./subjects";
import { TicketEventData } from "./ticket-event-data";

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: TicketEventData;
}