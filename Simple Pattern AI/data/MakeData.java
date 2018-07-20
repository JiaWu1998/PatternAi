import java.io.*;
import java.lang.Math;
public class MakeData{
  public static void main(String[] args) throws IOException{
    FileOutputStream dataFile = new FileOutputStream("data.txt");
    PrintWriter write = new PrintWriter(dataFile);
    for(int b=0; b<5000;b++){
      int[] gon = constructFirstIntPattern();
      write.println(gon[0]+","+gon[1]+","+gon[2]+","+gon[3]+","+gon[4]+","+gon[5]);
    }
    write.flush();
    dataFile.close();
  }
  public static int[] constructFirstIntPattern(){
    int[] pattern = new int[6];
    for(int i=0; i<6; i++){
      pattern[i] = (i != 5) ? (int) Math.floor(Math.random()*2.0) : pattern[0];
    }
    return pattern;
  }
}
