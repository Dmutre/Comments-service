import { Module } from "@nestjs/common";
import { EventsGateway } from "src/events/EventsGateway";


@Module({
  providers: [EventsGateway]
})
export class EventsModule {}