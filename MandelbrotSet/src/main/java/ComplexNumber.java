package main;

public class ComplexNumber {
   protected double real;
   protected double imaginary;
   public  ComplexNumber(){
   	  
   }
   
   public ComplexNumber(double r, double i){
	   real = r;
	   imaginary = i;
   }
   public void setReal(double aReal){
   	  real=aReal;
   	  return;
   }
   public double getReal(){
   	  return real;
   }
   public void setImaginary(double anImaginary){
   	  imaginary = anImaginary;
   	  return;
   }
   public double getImaginary(){
   	  return imaginary;
   }
   public static ComplexNumber complexMult(ComplexNumber c1, ComplexNumber c2){
   	  //(ai+b)*(ui+w) = -au+(aw+bu)i+bw   	  
      double r = -c1.imaginary*c2.imaginary+c1.real*c2.real;
      double i = c1.imaginary*c2.real+c1.real*c2.imaginary;
   	  ComplexNumber result = new ComplexNumber(r,i);
   	  return result;
   }
   public static ComplexNumber complexDiv(ComplexNumber c1, ComplexNumber c2){
	   double r=0;
       double i=0;
       double divisor = (c2.real*c2.real+c2.imaginary*c2.imaginary);
       if(divisor != 0){
           r = (c1.real*c2.real+c1.imaginary*c2.imaginary)/divisor;
           i = (c1.imaginary*c2.real-c1.real*c2.imaginary)/divisor;
       }
       return new ComplexNumber(r,i);
   }
   public static ComplexNumber complexAdd(ComplexNumber c1, ComplexNumber c2){
   	  ComplexNumber result = new ComplexNumber();
   	  result.imaginary = c1.imaginary+c2.imaginary;
   	  result.real = c1.real+c2.real;
   	  return result;
   }
   public static double complexMag(ComplexNumber c){
       return (double) Math.sqrt(c.imaginary * c.imaginary + c.real * c.real);
   }
}
