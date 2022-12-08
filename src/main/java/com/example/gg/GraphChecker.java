package com.example.gg;

public class GraphChecker implements HitChecker{
    @Override
    public boolean checkHit(double x, double y, double r) {
        if (x >= 0){
            if (y > 0){
                return false;
            }
            else {
                if (x < r && y > (-r/2)){
                    return true;
                }
            }
        }
        if (x <= 0){
            if (y >=0){
                if (y <= (x * 2 + r)){
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
