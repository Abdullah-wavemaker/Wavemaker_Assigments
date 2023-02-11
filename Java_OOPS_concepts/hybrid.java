class roti{
    int calories1=71;
    public void printer(){
        System.out.println("roti has 70 calories");
    }
}
class rice extends roti{
    int calories2=130;
    int calories3=calories1+calories2;
    public void printer2() {
        System.out.println("you had a total of "+calories3+" calories");
    }
}

class caloriecount extends rice{
    int caloriescount=500-calories3;
    public void printer3(){
        System.out.println("you are left with "+caloriescount+" so u can have a desert");
    }
}
public class hybrid {
    public static void main(String args[]){
        caloriecount c=new caloriecount();
        c.printer3();
    }
}
