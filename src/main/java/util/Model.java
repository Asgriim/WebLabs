package util;

import java.util.LinkedList;
import java.util.List;

public class Model {
    private String rowsInJson = "";
    private final List<Row> data = new LinkedList<>();
    public void add(Row r){
        data.add(r);
        rowsInJson += r.getJSON() + ",";
    }

    public String getDataJSON(){
        if (rowsInJson.length() == 0){
            return "[]";
        }
        return "["+ rowsInJson.substring(0, rowsInJson.length() - 1) + "]";
    }
}
