import { Module } from "@nestjs/common";
import { EventsGateway } from "src/events/EventsGateway";


@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}