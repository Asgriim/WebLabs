package com.example.gg;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ManagedBean(name = "Row")
@SessionScoped
@Entity(name = "attempts")
@Table(name = "attempts",schema = "public")
public class Row implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HitsIdGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    @Column(name = "time")
    private Instant instantTime;
    @Column(name = "x")
    private double x = 1;
    @Column(name = "y")
    private double y = 0;
    @Column(name = "r")
    private double r = 2;
    @Column(name = "scriptTime")
    long scriptTime;
    @Column(name = "hit")
    private boolean hit;


    public Row(){}

    public Row(double x, double y, double r, long scriptTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.scriptTime = scriptTime;
        this.hit = hit;
    }



    public Instant getInstantTime() {
        return instantTime;
    }

    public void setInstantTime(Instant instantTime) {
        this.instantTime = instantTime;
    }


    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public long getScriptTime() {
        return scriptTime;
    }

    public void setScriptTime(long scriptTime) {
        this.scriptTime = scriptTime;
    }

    public boolean isHit() {
        return hit;
    }


    public void setHit(boolean hit) {
        this.hit = hit;
    }


    @Override
    public String toString() {
        return "Row{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", scriptTime=" + scriptTime +
                ", hit=" + hit +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }
}
