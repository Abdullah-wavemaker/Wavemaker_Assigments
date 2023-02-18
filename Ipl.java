import java.util.Scanner;
import java.util.ArrayList;
import java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
class scheduler{
    public void schedule(ArrayList<String> Teams, ArrayList<String> Home_towns, String start_date,int total_matches){
        ArrayList<Integer> First_half_dates_id = new ArrayList<Integer>();
        ArrayList<String> First_half_dates = new ArrayList<String>();
        ArrayList<ArrayList<String>> matches_played = new ArrayList<ArrayList<String>>();
        ArrayList<ArrayList<String>> final_matches = new ArrayList<ArrayList<String>>();
        ArrayList<Integer> FinalOrder = new ArrayList<Integer>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(sdf.parse(start_date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        while (First_half_dates.size()< (total_matches/2)) {
            cal.add(Calendar.DAY_OF_MONTH, 1);
            String dateAfter = sdf.format(cal.getTime());
            First_half_dates.add(dateAfter);
            First_half_dates_id.add(1);
            if (cal.get(Calendar.DAY_OF_WEEK) == 7) {
                First_half_dates.add(dateAfter);
                First_half_dates_id.add(2);
            }
            if (cal.get(Calendar.DAY_OF_WEEK) == 1) {
                First_half_dates.add(dateAfter);
                First_half_dates_id.add(3);
            }
        }
        for (int a = 0; a < First_half_dates_id.size(); a++) {
            if (First_half_dates_id.get(a) == 3) {
                First_half_dates_id.set(a - 1, 2);
            }
        }
        int counter = 0;
        for (int i = 0; i < Teams.size(); i++) {
            for (int j = i + 1; j < Teams.size(); j++) {
                if (i != j) {
                    counter++;
                    ArrayList<String> temp = new ArrayList<String>();
                    temp.add(Teams.get(i));
                    temp.add(Teams.get(j));
                    matches_played.add(temp);
                }
            }
        }
        int midele = Teams.size()/ 2;
        int startele = midele;
        int counter2 = 0;
        int i = 1;
        while (counter2 < startele) {
            FinalOrder.add(midele);
            final_matches.add(matches_played.get(midele - 1));
            midele = midele + Teams.size() - i;
            i++;
            counter2++;
        }
        String prev1 = final_matches.get(startele - 1).get(0);
        String prev2 = final_matches.get(startele - 1).get(1);
        String prev3 = final_matches.get(startele - 2).get(0);
        String prev4 = final_matches.get(startele - 2).get(1);
        String prev5 = final_matches.get(startele - 3).get(0);
        String prev6 = final_matches.get(startele - 3).get(1);
        int temp3 = startele;
        while (temp3 < matches_played.size()-2) {
            for (int j = 0; j < matches_played.size(); j++) {
                if(First_half_dates_id.get(temp3-1)==1) {
                    if (((!matches_played.get(j).get(0).equals(prev1)) & (!matches_played.get(j).get(1).equals(prev1)) & (!matches_played.get(j).get(0).equals(prev2)) & (!matches_played.get(j).get(1).equals(prev2))) & (!final_matches.contains(matches_played.get(j)))) {
                        FinalOrder.add(j+1);
                        temp3++;
                        final_matches.add(matches_played.get(j));
                        prev1 = final_matches.get(temp3- 1).get(0);
                        prev2 = final_matches.get(temp3- 1).get(1);
                    }
                }
                if(First_half_dates_id.get(temp3-1)==2) {
                    if (((!matches_played.get(j).get(0).equals(prev1)) & (!matches_played.get(j).get(1).equals(prev1)) & (!matches_played.get(j).get(0).equals(prev2)) & (!matches_played.get(j).get(1).equals(prev2)) & (!matches_played.get(j).get(0).equals(prev3)) & (!matches_played.get(j).get(1).equals(prev3)) & (!matches_played.get(j).get(0).equals(prev4)) & (!matches_played.get(j).get(1).equals(prev4))) & (!final_matches.contains(matches_played.get(j)))){
                        FinalOrder.add(j+1);
                        temp3++;
                        final_matches.add(matches_played.get(j));
                        prev1 = final_matches.get(temp3- 1).get(0);
                        prev2 = final_matches.get(temp3- 1).get(1);
                        prev3 = final_matches.get(temp3- 2).get(0);
                        prev4 = final_matches.get(temp3- 2).get(1);
                    }
                }
                if(First_half_dates_id.get(temp3-1)==3) {
                    if (((!matches_played.get(j).get(0).equals(prev1)) & (!matches_played.get(j).get(1).equals(prev1)) & (!matches_played.get(j).get(0).equals(prev2)) & (!matches_played.get(j).get(1).equals(prev2)) & (!matches_played.get(j).get(0).equals(prev3)) & (!matches_played.get(j).get(1).equals(prev3)) & (!matches_played.get(j).get(0).equals(prev4)) & (!matches_played.get(j).get(1).equals(prev4))& (!matches_played.get(j).get(0).equals(prev5)) & (!matches_played.get(j).get(1).equals(prev5)) & (!matches_played.get(j).get(0).equals(prev6)) & (!matches_played.get(j).get(1).equals(prev6))) & (!final_matches.contains(matches_played.get(j)))){
                        FinalOrder.add(j+1);
                        temp3++;
                        final_matches.add(matches_played.get(j));
                        prev1 = final_matches.get(temp3- 1).get(0);
                        prev2 = final_matches.get(temp3- 1).get(1);
                        prev3 = final_matches.get(temp3- 2).get(0);
                        prev4 = final_matches.get(temp3- 2).get(1);
                        prev5 = final_matches.get(temp3- 3).get(0);
                        prev6 = final_matches.get(temp3- 3).get(1);
                    }
                }
            }
        }
        int counter3=matches_played.size();
        for(int k=0;k<counter3;k++){
            final_matches.add(final_matches.get(k));
        }
        for (int m=0;m< final_matches.size()/2;m++){
            String s=final_matches.get(m).get(0);
            int n=Teams.indexOf(s);
            System.out.println("the match between "+final_matches.get(m).get(0)+" vs "+final_matches.get(m).get(1)+" is scheduled on "+Home_towns.get(n));
        }
        for (int m=final_matches.size()/2;m< final_matches.size();m++){
            String s=final_matches.get(m).get(1);
            int n=Teams.indexOf(s);
            System.out.println("the match between "+final_matches.get(m).get(0)+" vs "+final_matches.get(m).get(1)+" is scheduled on "+Home_towns.get(n));
        }
    }
}
public class Ipl {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> Teams = new ArrayList<String>();
        ArrayList<String> Home_towns = new ArrayList<String>();
        System.out.println("Enter no of teams participating");
        int no_of_teams = sc.nextInt();
        int total_matches = ((no_of_teams)*(no_of_teams-1));
        System.out.println("Enter " + no_of_teams + " team names");
        while (no_of_teams != 0) {
            String team_name = sc.next();
            Teams.add(team_name);
            no_of_teams--;
        }
        for (int i = 0; i < Teams.size(); i++) {
            System.out.println("Enter home town of team " + Teams.get(i));
            String hometown = sc.next();
            Home_towns.add(hometown);
        }
        System.out.println("Enter the first day of match");
        String start_date = sc.next();
        scheduler s = new scheduler();
        s.schedule(Teams, Home_towns, start_date,total_matches);
    }
}
