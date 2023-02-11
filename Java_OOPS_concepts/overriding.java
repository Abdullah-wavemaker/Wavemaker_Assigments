import java.util.*;
class beforebf{
    String[] menu=new String[] {"idly","rice","tea","roti","desert"};
    public void record(){
        System.out.println("you are left with idly,rice,tea,roti and dessert");
    }
}
class afterbf extends beforebf{
    @Override
    public void record(){
        System.out.println("you are left with rice,tea,roti and dessert");
    }
}

class afterlunch extends afterbf{
    public void record(){
        System.out.println("you are left with tea,roti and dessert");
    }
}
public class overriding {
    public static void main(String args[]){
        afterlunch al=new afterlunch();
        al.record();
    }
}
