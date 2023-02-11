package collections;

import java.util.ArrayList;
import java.util.Collections;

public class student {
    public static void main(String[] args) {
        ArrayList<StudentInfo> StudentInfos = new ArrayList<StudentInfo>();
        StudentInfos.add(new StudentInfo("Mak", 53));
        StudentInfos.add(new StudentInfo("Abd", 34));
        StudentInfos.add(new StudentInfo("Ak", 78));

        for(StudentInfo StudentInfo: StudentInfos) {
            StudentInfo.printDetails();
        }

        Collections.sort(StudentInfos, new comparator());
        System.out.println("sorted list is "+StudentInfos);
    }
}
class StudentInfo {
    public String name;
    public int ClgId;

    public StudentInfo(String name, int ClgId) {
        this.name = name;
        this.ClgId = ClgId;
    }

    public void printDetails() {
        System.out.println("student name is "+name+" with student id "+ClgId);
    }

    public int getClgId() {
        return ClgId;
    }
    @Override
    public String toString() {
        return name + " (" + ClgId + ")";
    }
}

class comparator implements java.util.Comparator<StudentInfo>{
    @Override
    public int compare(StudentInfo s1, StudentInfo s2) {
        return s1.getClgId() - s2.getClgId();
    }
}
