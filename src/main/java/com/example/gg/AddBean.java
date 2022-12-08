package com.example.gg;

import javax.faces.bean.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//@RequestScoped
@ManagedBean(name = "addBean")
@SessionScoped

public class AddBean implements Serializable {
    private Row row = new Row();
    private List<Row> arr;
    @javax.faces.bean.ManagedProperty(value = "#{model}")
    private Model model;
    private final HitChecker hitChecker = new GraphChecker();

    public AddBean(){
        System.out.println("add bean costructor");
    };

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
        System.out.println("add bean set module");
        this.arr = new ArrayList<>(model.getArr());
    }


    public Row getRow() {
        return row;
    }

    public void setRow(Row row) {
        this.row = row;
    }

    public void addToTable(){
        long start = System.nanoTime();
        row.setInstantTime(Instant.now());
        row.setHit(hitChecker.checkHit(row.getX(),row.getY(), row.getR()));
        row.setScriptTime(System.nanoTime() - start);
        model.addToTable(row);
        arr.add(row);
        row = new Row();
    }
    public List<Row> getReversedArr(){
        List l = new ArrayList(arr);
        Collections.reverse(l);
        return l;
    }

    public List<Row> getArr() {
        return arr;
    }

    public void setArr(List<Row> arr) {
        System.out.println("set arr kek w");
        this.arr = arr;
    }

    public void clearArr(){
        arr.clear();
    }

}
