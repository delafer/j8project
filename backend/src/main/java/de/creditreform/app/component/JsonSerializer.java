package de.creditreform.app.component;

import com.dslplatform.json.DslJson;
import com.dslplatform.json.runtime.Settings;
import de.creditreform.app.model.Event;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;

@Service
public class JsonSerializer {

    private final static DslJson<Object> dsljson = new DslJson<>(Settings.withRuntime().includeServiceLoader());
    private static final Charset UTF_8 = Charset.forName("UTF-8");

    <E> E fromJSON(String json, Class<E> classType) throws IOException {
        System.out.println("fromJSON");
        byte[] bytes = json.getBytes(UTF_8); //convert string to UTF-8 bytes
        E instance = dsljson.deserialize(classType, bytes, bytes.length);
        return instance;
    }

    <E> String toJSON(E object) throws IOException {
        System.out.println("toJSON");
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        dsljson.serialize(object, os);
        return os.toString(UTF_8);
    }

    public static void main(String[] args) {
        Event a = new Event("a", 123);
        JsonSerializer js = new JsonSerializer();
        try {
            String x = js.toJSON(a);
            System.out.println(x);
            Event b = js.fromJSON(x, Event.class);
            System.out.println(b.toString()+":"+ b.getName()+":"+ b.getCount());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
