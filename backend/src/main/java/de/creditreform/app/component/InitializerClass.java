package de.creditreform.app.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.creditreform.app.service.EventUnicastService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Log4j2
@Component
public class InitializerClass implements ApplicationListener<ApplicationReadyEvent> {

    private EventUnicastService eventUnicastService;

    @Autowired
    public InitializerClass(EventUnicastService eventUnicastService) {
        this.eventUnicastService = eventUnicastService;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        System.out.println("RRRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAADDDDDDDDDDDDDDYYYYYYYYYYYYYYY!!!!!!!!");
        this.eventUnicastService.getMessages().subscribe(x -> {
            System.out.println(x);
        });
    }
}
