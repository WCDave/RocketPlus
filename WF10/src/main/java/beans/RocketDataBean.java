package beans;


import java.io.Serializable;

public class RocketDataBean implements Serializable {

  private String label;
  private String value;

  public RocketDataBean(String label, String value){
    this.label = label;
    this.value = value;
  }

  public String getLabel() {
    return label;
  }

  public String getValue() {
    return value;
  }

}
