
class lunch2{
    public void wtalluhad(String a){
        System.out.println("have some snacks then start");
    }
    public void wtalluhad(String a,String b){
        System.out.println("you can try tea");
    }
    public void wtalluhad(String a,String b,String c){
        System.out.println("get back to work");
    }
}
public class overloading {
    public static void main(String args[]){
        lunch2 l= new lunch2();
        l.wtalluhad("snacks");
        l.wtalluhad("chapati","rice");
        l.wtalluhad("chapati","rice","tea");
    }
}