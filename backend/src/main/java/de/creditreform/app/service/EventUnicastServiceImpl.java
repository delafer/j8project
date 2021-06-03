package de.creditreform.app.service;

import de.creditreform.app.model.Event;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class EventUnicastServiceImpl implements EventUnicastService {

    //private EmitterProcessor<Event> processor = EmitterProcessor.create();
    private Sinks.Many<Event> processor = Sinks.many().multicast().onBackpressureBuffer(); //(Queues.SMALL_BUFFER_SIZE, true) ;

    @Override
    public void onNext(Event next) {
       // processor.onNext(next);
        processor.tryEmitNext(next);
    }

    @Override
    public Flux<Event> getMessages() {
        return processor.asFlux();
        //return processor.publish().autoConnect();
    }
}
