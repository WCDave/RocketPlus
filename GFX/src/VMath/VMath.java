package VMath;

import java.util.Arrays;
import java.util.List;

public final class VMath {
	public static float mag(float vector[]) {
		float magnitude = 0;
		int vecLength = vector.length;
		for (int i = 0; i < vecLength; i++) {
			magnitude = magnitude + vector[i] * vector[i];
		}
		return (float) Math.sqrt(magnitude);
	}

	public static double mag(double vector[]) {
		double magnitude = 0;
		int vecLength = vector.length;
		for (int i = 0; i < vecLength; i++) {
			magnitude = magnitude + vector[i] * vector[i];
		}
		return Math.sqrt(magnitude);
	}

	public static float[] normalize(float vec[]) {
		int vecLength = vec.length;
		float vecr[] = new float[vecLength];
		final float tmag = mag(vec);
		if (tmag != 0) {
			for (int i = 0; i < vecLength; i++)
				vecr[i] = vec[i] / tmag;
		}
		return vecr;
	}

	public static double[] normalize(double vec[]) {
		int vecLength = vec.length;
		double vecr[] = new double[vecLength];
		final double tmag = mag(vec);
		if (tmag != 0) {
			for (int i = 0; i < vecLength; i++)
				vecr[i] = vec[i] / tmag;
		}
		return vecr;
	}

	public static float dotprod(float vec1[], float vec2[]) {
		float dumb = 0;
		int vecLength = Math.min(vec1.length, vec2.length);
		for (int i = 0; i < vecLength; i++) {
			dumb += vec1[i] * vec2[i];
		}
		return dumb;
	}

	public static double dotprod(double vec1[], double vec2[]) {
		double dumb = 0;
		int vecLength = Math.min(vec1.length, vec2.length);
		for (int i = 0; i < vecLength; i++) {
			dumb += vec1[i] * vec2[i];
		}
		return dumb;
	}

	public static float[] crossprd(float vec1[], float vec2[]) {
		float vecr[] = { 0, 0, 0, 0 };
		vecr[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
		vecr[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
		vecr[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
		return vecr;
	}

	public static double[] crossprd(double vec1[], double vec2[]) {
		double vecr[] = { 0, 0, 0, 0 };
		vecr[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
		vecr[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
		vecr[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
		return vecr;
	}

	public static double modulo(double arg1, double arg2) {
		double aValue = arg1 / arg2;
		aValue = aValue - (long) (aValue);
		aValue = aValue * arg2;
		return aValue;
	}

	public static float[] rotate2D(float anInputVec[], double anAngle) {
		float aVec[] = new float[2];
		/*
		 * x2 = x1 cos w - y1 sin w y2 = x1 sin w + y1 cos w z2 = z1
		 */
		aVec[0] = (float) (anInputVec[0] * Math.cos(anAngle) - anInputVec[1] * Math.sin(anAngle));
		aVec[1] = (float) (anInputVec[0] * Math.sin(anAngle) + anInputVec[1] * Math.cos(anAngle));
		return aVec;
	}

	public static double[] rotate2D(double anInputVec[], double anAngle) {
		double aVec[] = new double[2];
		/*
		 * x2 = x1 cos w - y1 sin w y2 = x1 sin w + y1 cos w z2 = z1
		 */
		aVec[0] = (anInputVec[0] * Math.cos(anAngle) - anInputVec[1] * Math.sin(anAngle));
		aVec[1] = (anInputVec[0] * Math.sin(anAngle) + anInputVec[1] * Math.cos(anAngle));
		return aVec;
	}

	public static float[] transform(float[] inVec, float[][] aMatrix) {
		float[] aVec = { 0, 0, 0 };
		for (int i = 0; i < 3; i++)
			for (int j = 0; j < 3; j++)
				aVec[i] += inVec[j] * aMatrix[i][j];
		return aVec;
	}

	public static double[] transform(double[] inVec, double[][] aMatrix) {
		double[] aVec = { 0, 0, 0 };
		for (int i = 0; i < 3; i++)
			for (int j = 0; j < 3; j++)
				aVec[i] += inVec[j] * aMatrix[i][j];
		return aVec;
	}

	public static float[] vecAdd(float[] a, float[] b) {
		float[] aResult = { a[0] + b[0], a[1] + b[1], a[2] + b[2] };
		return aResult;
	}

	public static double[] vecAdd(double[] a, double[] b) {
		double[] aResult = { a[0] + b[0], a[1] + b[1], a[2] + b[2] };
		return aResult;
	}

	public static float[] vecSubtract(float[] a, float[] b) {
		float[] aResult = new float[a.length];
		for (int i = 0; i < a.length; i++) {
			aResult[i] = a[i] - b[i];
		}
		return aResult;
	}

	public static double[] vecSubtract(double[] a, double[] b) {
		double[] aResult = new double[a.length];
		for (int i = 0; i < a.length; i++) {
			aResult[i] = a[i] - b[i];
		}
		return aResult;
	}

	public static float[] vecMultByScalar(float[] aVec, float aScalar) {
		float[] aResult = new float[aVec.length];
		for (int i = 0; i < aVec.length; i++)
			aResult[i] = aVec[i] * aScalar;
		return aResult;
	}

	public static double[] vecMultByScalar(double[] aVec, double aScalar) {
		double[] aResult = new double[aVec.length];
		for (int i = 0; i < aVec.length; i++)
			aResult[i] = aVec[i] * aScalar;
		return aResult;
	}

	public static float[] vecMultByScalar(float[] aVec, double aScalar) {
		float[] aResult = new float[aVec.length];
		for (int i = 0; i < aVec.length; i++)
			aResult[i] = (float) (aVec[i] * aScalar);
		return aResult;
	}

	public static float[] reflectionOf(float[] inVec, float[] normalVec) {
		// x=V-2*(V dot n)*n
		float[] aResult = new float[inVec.length];
		float aTerm = 2 * dotprod(inVec, normalVec);
		aResult = vecMultByScalar(normalVec, aTerm);
		aResult = vecSubtract(inVec, aResult);
		return aResult;
	}

	public static double[] vecMultByMatrix(double[] vec, double[][] matrix) {
		double[] resultVec = { 0, 0, 0, 0 };
		for (int i = 0; i < 3; i++)
			for (int j = 0; j < 3; j++)
				resultVec[i] = resultVec[i] + vec[j] * matrix[j][i];
		return resultVec;
	}

	public static float[] vecMultByMatrix(float[] vec, float[][] matrix) {
		float[] resultVec = { 0, 0, 0, 0 };
		for (int i = 0; i < 3; i++)
			for (int j = 0; j < 3; j++)
				resultVec[i] = resultVec[i] + vec[j] * matrix[j][i];
		return resultVec;
	}

	public static double[] EMA(double[][] vector, double smoothingFactor) {
		int n = vector.length;
		double[] processingResult = new double[n];
		double[] result = new double[vector[0].length];
		Arrays.fill(processingResult, 0.0);
//		double k = 2.0 / ((double) n + 1.0);

		for (int i = 0; i < 3; i++) {
			double[] input = new double[n];
			int xx = 0;
			for (int j = n - 1; j >= 0; j--) {
				input[xx++] = vector[j][i];
			}
			result[i] = EMAHelper(input, smoothingFactor, n-1, processingResult);
		}
		/*
		 * ​
		 * 
		 * EMA=Price(t)×k+EMA(y)×(1−k) where: t=today y=yesterday N=number of days in
		 * EMA k=2÷(N+1) ​
		 * 
		 */
		
		return result;
	}
	
	public static double[] EMA(List<double[]> vectors, double n) {
		int vectorSize = vectors.size();
		double[] processingResult = new double[vectorSize];
		Arrays.fill(processingResult, 0.0);
		double[] result = new double[vectors.get(0).length];
		
		
		double[] xVals = new double[vectorSize];
		double[] yVals = new double[vectorSize];
		double[] zVals = new double[vectorSize];
		int kk=0;
		for(int i=vectorSize-1;i>=0; i--) {
			xVals[kk] = vectors.get(i)[0];
			yVals[kk] = vectors.get(i)[1];
			zVals[kk] = vectors.get(i)[2];
			kk++;
		}
		result[0] = EMAHelper(xVals, n, vectorSize-1, processingResult);
		
		Arrays.fill(processingResult, 0.0);
		result[1] = EMAHelper(yVals, n, vectorSize-1, processingResult);
		
		Arrays.fill(processingResult, 0.0);
		result[2] = EMAHelper(zVals, n, vectorSize-1, processingResult);	
		
		return result;
	}

	public static double EMAHelper(double[] vector, double n, int i, double[] results) {
		 if(i == 0) {
			 results[0] = vector[0];
			 return results[0];
		 }
		 else {
		   double val = vector[i];
		   double factor = ( 2.0 / (n + 1) );
		   double ema = val * factor + (1-factor) * EMAHelper(vector, n, i-1, results);
			
		   results[i] = ema;
		   return ema;
		 }

	}
}
