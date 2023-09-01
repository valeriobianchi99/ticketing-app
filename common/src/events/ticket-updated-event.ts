import { Subjects } from "./subjects";
import { TicketEventData } from "./ticket-event-data";

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: TicketEventData;
}