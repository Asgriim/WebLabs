package util;

import java.text.SimpleDateFormat;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Row {
    private final double x;
    private final double y;
    private final double r;
    private final String hit;
    private static final Clock clock = Clock.systemDefaultZone();
    private final LocalDateTime time;
    private final double scriptTime;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
//    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    private final String jsonTemplate = "{" +
            "\"R\":%s," +
            "\"X\":%s," +
            "\"Y\":%s," +
            "\"hit\":\"%s\"," +
            "\"date\":\"%s\"," +
            "\"scriptTime\":\"%s\"" +
            "}";
    public Row(double x, double y, double r, String hit, double scriptTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.scriptTime = scriptTime;
        this.time = LocalDateTime.now(clock);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public double getScriptTime() {
        return scriptTime;
    }

    public String getJSON(){
        return String.format(jsonTemplate,r,x,y,hit,
                time.format(formatter),
                scriptTime);
    }
}
