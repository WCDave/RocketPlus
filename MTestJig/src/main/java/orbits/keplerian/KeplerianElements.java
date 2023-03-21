package orbits.keplerian;


import orbits.CoordSys;
import org.apache.commons.math3.util.FastMath;

import java.io.Serializable;

public class KeplerianElements implements Serializable {

  private double a;
  private double e;
  private double i;
  private double raan;
  private double aop;
  private double ta;
  private CoordSys sys;

  public KeplerianElements(double a, double e, double i, double raan, double aop, double ta, CoordSys sys) {
    this.a = a;
    this.e = e;
    this.i = i;
    this.raan = raan;
    this.aop = aop;
    this.ta = ta;
    this.sys = sys;
  }

  public double getA() {
    return a;
  }

  public double getE() {
    return e;
  }

  public double getI() {
    return i;
  }

  public double getRaan() {
    return raan;
  }

  public double getAop() {
    return aop;
  }

  public double getTa() {
    return ta;
  }

  public CoordSys getCoordSys() {
    return this.sys;
  }

  public double getPeriod() {
    return KeplerCalc.TWO_PI * FastMath.sqrt(this.a*this.a*this.a/KeplerCalc.mu);
  }
}
