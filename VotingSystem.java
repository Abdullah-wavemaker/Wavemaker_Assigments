import java.util.Scanner;
import java.util.*;
interface voting_system{
    void VoteNow(int VoterId, String VoterName, int NomineeId);
    void NomineeInfo();
}
class Votes implements voting_system{
    HashMap<Integer, Integer> VoteDetails = new HashMap<Integer, Integer>();
    HashMap<Integer, String> UserDetails = new HashMap<Integer, String>();
    public void VoteNow(int VoterId, String VoterName, int NomineeId) {
        if (UserDetails.containsKey(VoterId)) {
            System.out.println("You cannot vote again");
        } else {
            VoteDetails.put(VoterId, NomineeId);
            UserDetails.put(VoterId, VoterName);
        }
    }
    public void NomineeInfo() {
        HashMap<Integer, String> NomineeDetails = new HashMap<Integer, String>();
        NomineeDetails.put(1, "TRS");
        NomineeDetails.put(2, "BJP");
        NomineeDetails.put(3, "CONGRESS");
        NomineeDetails.put(4, "CPI");
        int winners = 0;
        int TrsVotes,BjpVotes,CongressVotes,CpiVotes;
        TrsVotes=BjpVotes=CongressVotes=CpiVotes=0;
        System.out.println("Displaying TRS party voters: ");
        for (int key : VoteDetails.keySet()) {
            if (VoteDetails.get(key).equals(1)) {
                System.out.println(UserDetails.get(key).toString()+" has voted with voter id "+key);
                TrsVotes++;
            }
        }
        System.out.println("Displaying BJP party voters: ");
        for (int key : VoteDetails.keySet()) {
            if (VoteDetails.get(key).equals(2)) {
                System.out.println(UserDetails.get(key).toString()+" has voted with voter id "+key);
                BjpVotes++;
            }
        }
        System.out.println("Displaying Congress party voters: ");
        for (int key : VoteDetails.keySet()) {
            if (VoteDetails.get(key).equals(3)) {
                System.out.println(UserDetails.get(key).toString()+" has voted with voter id "+key);
                CongressVotes++;
            }
        }
        System.out.println("Displaying CPI party voters: ");
        for (int key : VoteDetails.keySet()) {
            if (VoteDetails.get(key).equals(4)) {
                System.out.println(UserDetails.get(key).toString()+" has voted with voter id "+key);
                CpiVotes++;
                }
            }
        int max = (Math.max(TrsVotes,Math.max(BjpVotes,Math.max(CongressVotes,CpiVotes))));
        if(TrsVotes == max){
            System.out.println("TRS has max votes");
            winners++;
        }
        if(BjpVotes == max){
            System.out.println("BJP has max votes");
            winners++;
        }
        if(CongressVotes == max){
            System.out.println("Congress has max votes");
            winners++;
        }
        if(CpiVotes == max){
            System.out.println("Cpi has max votes");
            winners++;
        }
        if(winners>1){
            System.out.println("Hence it is draw");
        }
        }
    }
    public class VotingSystem {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            Votes v = new Votes();
            System.out.println("Welcome to virtual voting");
            System.out.println("Pls enter no of voters");
            int voters = sc.nextInt();
            while (voters != 0) {
                System.out.println("enter last 4 digits of your aadhar");
                int VoterId = sc.nextInt();
                System.out.println("Enter voter name");
                String VoterName = sc.next();
                System.out.println("Choose whom to vote");
                System.out.println("for TRS enter 1");
                System.out.println("for BJP enter 2");
                System.out.println("for CONGRESS enter 3");
                System.out.println("for CPI enter 4");
                int NomineeId = sc.nextInt();
                v.VoteNow(VoterId, VoterName, NomineeId);
                voters--;
            }
            v.NomineeInfo();
        }
    }