class payment{
    private int atmpin=6708;
    public String cardnum="1234-5678-0987";

    protected String transactionid="123Fdaf567";
    public void pay(){
        System.out.println("payment successfull");
    }
}

class lunch extends payment{
    public void bill(){
        System.out.println("your bill is of 569 rupees");
        System.out.println("you made payment through "+cardnum);
        System.out.println("your transaction id is "+transactionid);

    }
}
public class encaps {
    public static void main(String args[]){
        lunch l=new lunch();
        l.bill();
    }
}
