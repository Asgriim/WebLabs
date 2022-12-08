package com.example.gg;


import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.Serializable;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TimeZone;

@ManagedBean(name = "model", eager = true)
@ApplicationScoped
public class Model implements Serializable {
    private List<Row> arr = new ArrayList<>();
    private int num;
    EntityManagerFactory factory;

    public Model(){
        factory = Persistence.createEntityManagerFactory("db");
        EntityManager manager = factory.createEntityManager();
        this.arr = manager.createQuery("SELECT a from attempts a", Row.class).getResultList();
    }


    public List<Row> getReversedArr(){
        System.out.println("дай массив реверсед");
        List l = new ArrayList(arr);
        Collections.reverse(l);
        return l;
    }

    public void clearTable(){
        arr.clear();
    }

    public void addToTable(Row row){
        EntityManager manager = factory.createEntityManager();
        EntityTransaction transaction = manager.getTransaction();
        transaction.begin();
        manager.persist(row);
        arr.add(row);
        transaction.commit();
    }

    public void clearDb(){
        EntityManager manager = factory.createEntityManager();
        EntityTransaction transaction = manager.getTransaction();
        transaction.begin();
        manager.createQuery("DELETE FROM attempts a").executeUpdate();
        transaction.commit();

    }
    public List<Row> getArr() {
        return arr;
    }

    public void setArr(List<Row> arr) {
        this.arr = arr;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
