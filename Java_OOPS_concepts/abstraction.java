
abstract class paymentdetails_lunch{

    public abstract void status();
    public void details1(int id){
        System.out.println("payment details for transaction id "+id);
        System.out.println("your bill was 560 rupees");
    }
}

class transid extends paymentdetails_lunch{
    public void status(){
        System.out.println("payment done");
    }
}
public class abstraction {
    public static void main(String args[]){
        transid id=new transid();
        id.details1(1234);
        id.status();
    }
}
