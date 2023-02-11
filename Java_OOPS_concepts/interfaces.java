interface starters{

    default void show()
    {
        System.out.println("Default starters");
    }
}
interface maincourse{

    default void show()
    {
        System.out.println("Default main course");
    }
}
class interfaces implements starters, maincourse {
    @Override
    public void show()
    {
        starters.super.show();
        maincourse.super.show();
    }

    public void showOfPI1() {
        starters.super.show();
    }
    public void showOfPI2() {
        maincourse.super.show();
    }
    public static void main(String args[])
    {
        interfaces d = new interfaces();
        d.show();
        System.out.println("Now Executing showOfPI1() showOfPI2()");
        d.showOfPI1();
        d.showOfPI2();
    }
}
