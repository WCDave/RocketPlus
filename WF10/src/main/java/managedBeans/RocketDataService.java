package managedBeans;

import beans.RocketDataBean;
import enums.OrbitElementKeys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.IRocketData;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.event.ActionEvent;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.io.Serializable;
import java.util.*;
import java.util.List;

@ManagedBean(name = "rocketDataService")
@Service("rocketDataService")
@SessionScoped
public class RocketDataService implements Serializable {

  @Autowired
  IRocketData rocketData;

  public RocketDataService () {

  }

  public Map updateData() {
    return rocketData.getRocketData();
  }

  public BufferedImage updateMap(BufferedImage im) {

    return im;
  }

  public static BufferedImage copyImage(BufferedImage source){
    ColorModel cm = source.getColorModel();
    boolean isAlphaPremultiplied = cm.isAlphaPremultiplied();
    WritableRaster raster = source.copyData(source.getRaster().createCompatibleWritableRaster());
    return new BufferedImage(cm, raster, isAlphaPremultiplied, null);
  }
}
