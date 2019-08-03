package managedBeans;

import org.springframework.stereotype.Service;

import javax.faces.bean.ManagedBean;

@ManagedBean(name = "editor")
@Service
public class EditorBean {

  private String value = "This editor is provided by PrimeFaces";

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }
}