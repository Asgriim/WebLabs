package com.example.gg;


import javax.faces.annotation.ManagedProperty;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@SessionScoped
@ManagedBean(name = "timeBean")
public class TimeBean implements Serializable {
    private ZoneId zoneId = ZonedDateTime.now().getZone();
    private String timeZoneOffset;

    static private final String FORMAT_STRING =  "dd.MM.yyyy HH:mm:ss";

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(FORMAT_STRING);


    public TimeBean() {}

    public String getTimeZoneOffset() {
        return timeZoneOffset;
    }

    public void setTimeZoneOffset(String timeZoneOffset) {
        this.timeZoneOffset = timeZoneOffset;
    }

    public void timeZoneChanged(){
        String offset = getTimeZoneOffset();
        String sign;
        TimeZone timeZone;

        double n = Double.parseDouble(offset) * 60;
        if(n < 0){
            sign = "-";
            n = -n;
        }
        else {
            sign = "+";
        }
        if (offset.contains(".")){
            String hours = String.valueOf((int)Math.floor(n / 60));
            String min = String.valueOf((int)Math.floor(n % 60));
            System.out.println("hours : " + hours);
            System.out.println("m " + min);
            timeZone = TimeZone.getTimeZone("GMT" + sign +hours + ":" + min);
            zoneId = timeZone.toZoneId();
            System.out.println("zone " + zoneId);
        }
        else{
            int x = Integer.parseInt(offset);
            System.out.println(offset);
            if (x < 0){
                x = -x;
            }

            timeZone = TimeZone.getTimeZone("GMT" + sign + x);
            zoneId = timeZone.toZoneId();
            System.out.println("zone " + zoneId);
        }
        formatter.withZone(zoneId);
        System.out.println("АХТУНГ ОНО СРАБОТАЛО");
    }

    public String getZonedTime(Row row){
        return row.getInstantTime().atZone(zoneId).format(formatter);
    }



}
