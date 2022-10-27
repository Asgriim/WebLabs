package util;

import java.util.Arrays;

public class PointValidator {

    private static final double X_MIN = -5;
    private static final double X_MAX = 3;
    private static final double Y_MIN = -3;
    private static final double Y_MAX = 3;
    private static final double[] R_VALUES = {1,2,3,4,5};
    public boolean validateData(String x, String y, String r){
        try {
            Double.parseDouble(x);
            Double.parseDouble(y);
            Integer.parseInt(r);
            return true;
        }
        catch (NumberFormatException e){
            return false;
        }
    }

    public boolean validatePoint(double x, double y, double r){
        if(x < X_MIN || x > X_MAX){
            return false;
        }
        if (y < Y_MIN || y > Y_MAX){
            return false;
        }
        if (!Arrays.stream(R_VALUES).anyMatch(rv -> rv == r)){
            return false;
        }
        return true;
    }

    public boolean checkHit(double x, double y, double r){
        if (x > 0){
            if (x > r || y < 0){
                return false;
            }
            if ( y <= (r / 2)){
                return true;
            }
        }
        if (x <= 0){
            if (y >=0){
                if (y <= (x + r) / 2){
                    return true;
                }
            }
            if (y < 0){
                if (Math.sqrt(x*x + y*y) <= r / 2){
                    return true;
                }
            }
        }
        return false;
    }
}
