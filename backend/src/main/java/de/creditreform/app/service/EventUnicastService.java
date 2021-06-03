package de.creditreform.app.service;
import de.creditreform.app.model.Event;
import reactor.core.publisher.Flux;

public interface EventUnicastService {

    void onNext(Event next);

    Flux<Event> getMessages();
}
