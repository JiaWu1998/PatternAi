import java.io.*;
import java.lang.Math;
import java.util.Scanner;
public class FindPermuatations{
  public static void main(String[] args) throws IOException{
    File file = new File("pattern.txt");
    Scanner read = new Scanner(file);
    String[] tokenHolder = new String[32];
    FileOutputStream dump = new FileOutputStream("output.txt");
    PrintWriter write = new PrintWriter(dump);

    for(int i=0; i<tokenHolder.length; i++){
        tokenHolder[i] = read.nextLine();
    }

    for(int h=0; h<6; h++){
      int layerpatterncount = 0;
        for(int k=0; k<32; k++){
          String[] ojij = tokenHolder[k].split(",");
          int[] breakdown = new int[5];
          for(int i=0; i<5;i++){
            breakdown[i] = Integer.parseInt(ojij[i]);
          }
          int count = 0;
          for(int w=0; w<5; w++){
            if(breakdown[w] == 1){
              count++;
            }
          }
          if (count == h){
            write.println(tokenHolder[k]);
             // System.out.println(count);
            layerpatterncount++;
          }
        }
    }
    write.flush();
    dump.close();
  }
}
