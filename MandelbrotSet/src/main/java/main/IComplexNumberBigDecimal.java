package main;

import java.math.BigDecimal;
import java.math.MathContext;

public interface IComplexNumberBigDecimal {
	void setReal(BigDecimal aReal);

	BigDecimal getReal();

	void setImaginary(BigDecimal anImaginary);

	BigDecimal getImaginary();
	
	public static IComplexNumberBigDecimal complexMult(IComplexNumberBigDecimal c1, IComplexNumberBigDecimal c2) {
		// (ai+b)*(ui+w) = -au+(aw+bu)i+bw
		BigDecimal r = c1.getImaginary().multiply(c2.getImaginary()).add(c1.getReal().multiply(c2.getReal())).negate();
//		BigDecimal r = -c1.getImaginary() * c2.getImaginary() + c1.getReal() * c2.getReal();
		
		BigDecimal i = c1.getImaginary().multiply(c2.getReal()).add(c1.getReal().multiply(c2.getImaginary()));
//		BigDecimal i = c1.getImaginary() * c2.getReal() + c1.getReal() * c2.getImaginary();
		IComplexNumberBigDecimal result = new ComplexNumberBigDecimal(r, i);
		return result;
	}
//	
//	public static ComplexNumberSimple complexDiv(ComplexNumberSimple c1, ComplexNumberSimple c2) {
//		double r = 0;
//		double i = 0;
//		double divisor = (c2.real * c2.real + c2.imaginary * c2.imaginary);
//		if (divisor != 0) {
//			r = (c1.real * c2.real + c1.imaginary * c2.imaginary) / divisor;
//			i = (c1.imaginary * c2.real - c1.real * c2.imaginary) / divisor;
//		}
//		return new ComplexNumberSimple(r, i);
//	}
//
	public static IComplexNumberBigDecimal complexAdd(IComplexNumberBigDecimal c1, IComplexNumberBigDecimal c2) {
//		ComplexNumberSimple result = new ComplexNumberSimple();
	    IComplexNumberBigDecimal result = new ComplexNumberBigDecimal();
	    result.setImaginary(c1.getImaginary().add(c2.getImaginary()));
//		result.imaginary = c1.getImaginary() + c2.getImaginary();
	    result.setReal(c1.getReal().add(c2.getReal()));
//		result.real = c1.getReal() + c2.getReal();
		return result;
	}
//
	public static double complexMag(IComplexNumberBigDecimal c) {
		double result = BigDecimal.ZERO.doubleValue();
		result = Math.sqrt(c.getImaginary().multiply(c.getImaginary()).add(c.getReal().multiply(c.getReal())).round(MathContext.DECIMAL32).doubleValue());
		return result;
//		return (double) Math.sqrt(c.getImaginary() * c.getImaginary() + c.getReal() * c.getReal());
	}

}
