package beans;

import enums.OrbitElementKeys;
import managedBeans.CoordSys;
import managedBeans.RocketDataService;
import managedBeans.VMath;
import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;


import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.util.*;
import java.util.List;

@ManagedBean(name="rocketDataViewBean")
@ViewScoped
@Component("rocketDataViewBean")
@Scope("singleton")
public class RocketDataViewBean implements Serializable, DisposableBean, InitializingBean, ApplicationContextAware {


  private List<RocketDataBean> rocketDataBeanList= Collections.EMPTY_LIST;
  private static ApplicationContext applicationContext;
  private static BufferedImage earthImage;
  private static StreamedContent solarSystemIm;

  private Map dataMap = Collections.emptyMap();
  private BufferedImage rocketTrackingImage;
  private int width = 691;
  private int height = 293;

  private String refName;
  private double rocketX, rocketY, rocketZ;
  private double refX, refY, refZ;

  private List<double[]> trackHistoryList = new ArrayList<>();
  public static final float earthRadius=(float)6.37e6;
  private List<float[]> moonSignalBoundary;
  private double[] moonPos = new double[]{0,0,0,0};


  @Autowired
  RocketDataService rocketDataService;

  public StreamedContent getSolarSystemImage() throws IOException {

    BufferedImage bufferedImg = new BufferedImage(400, 500, BufferedImage.TYPE_INT_RGB);
    Graphics2D g2 = bufferedImg.createGraphics();
    g2.setColor(Color.BLUE);
    g2.fill3DRect(0,0,400,500, true);
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    ImageIO.write(bufferedImg, "png", os);
    solarSystemIm = new DefaultStreamedContent(new ByteArrayInputStream(os.toByteArray()), "image/png");
    return solarSystemIm;
  }

  public boolean getHasSolarSystemImage() {
    return solarSystemIm != null;
  }

  public void updateData() {
    dataMap = rocketDataService.updateData();
    rocketDataBeanList = new ArrayList<>(dataMap.size());

    for(Object o : dataMap.keySet()) {
      Object value =  dataMap.get(o);
      if(value instanceof Map) continue;

      rocketDataBeanList.add(new RocketDataBean((String)o, value.toString()));
    }
    Collections.sort(rocketDataBeanList, new Comparator<RocketDataBean>() {
      @Override
      public int compare(RocketDataBean o1, RocketDataBean o2) {
        return o1.getLabel().compareTo(o2.getLabel());
      }
    });
  }


  public List<RocketDataBean> getRocketDataBeanList() {
      return rocketDataBeanList;
  }

  public void setRocketDataService(RocketDataService rocketDataService) {
    this.rocketDataService = rocketDataService;
  }


  public BufferedImage getRocketTrackingImage() {
    return rocketTrackingImage;
  }

  private List<float[]> createSignalBoundaryUsing(float radius, double[] pos) {
    List<float[]> resultList = new ArrayList<float[]>();

    double rayAngle = Math.asin(radius/ VMath.mag(pos));
    float signalRadius = (float)(radius * Math.sin(Math.PI -(rayAngle + Math.PI/2)));
    float zVal = (float)(radius * Math.cos(Math.PI - (rayAngle + Math.PI/2)));

    CoordSys cs = new CoordSys();
    double[] zUnit = VMath.normalize(pos);
    double[] yUnit = VMath.normalize(VMath.crossprd(zUnit, VMath.vecAdd(zUnit,new double[]{0,.5,.65} )));
    double[] xUnit = VMath.crossprd(yUnit, zUnit);
    yUnit = VMath.crossprd(zUnit, xUnit);

    cs.setXAxis(xUnit);
    cs.setYAxis(yUnit);
    cs.setZAxis(zUnit);
    for(int i=0;i<360;i+=2)
    {
      cs.zRotate(2);
      double[] point3D = VMath.vecMultByScalar(cs.xAxis().getVectorForm(), signalRadius);
      point3D = VMath.vecAdd(point3D, VMath.vecMultByScalar(cs.zAxis().getVectorForm(), zVal));
      resultList.add(new float[]{(float)point3D[0], (float)point3D[1], (float)point3D[2]});
    }

    return resultList;
  }

  public void updateMap(Map rocketData) {
    rocketTrackingImage = RocketDataService.copyImage(earthImage);
    width = rocketTrackingImage.getWidth();
    height = rocketTrackingImage.getHeight();
    Graphics2D g2 = rocketTrackingImage.createGraphics();

    rocketX = ((Double) rocketData.get(OrbitElementKeys.rocketX.name()))
            .doubleValue();
    rocketY = ((Double) rocketData.get(OrbitElementKeys.rocketY.name()))
            .doubleValue();
    rocketZ = ((Double) rocketData.get(OrbitElementKeys.rocketZ.name()))
            .doubleValue();

    refName = (String) rocketData.get(OrbitElementKeys.refName.name());
    refX = ((Double) rocketData.get(OrbitElementKeys.refX.name()))
            .doubleValue();
    refY = ((Double) rocketData.get(OrbitElementKeys.refY.name()))
            .doubleValue();
    refZ = ((Double) rocketData.get(OrbitElementKeys.refZ.name()))
            .doubleValue();
    Map locMap = (Map)rocketData.get(OrbitElementKeys.locMap.name());
    //List<Double>  moonPosList = (List<Double>) locMap.get("Moon");

    List<Double>  moonPosList = locMap!=null ? (List<Double>) locMap.get("Moon"):new ArrayList<Double>(){{
      add(0d);  add(0d); add(0d);
    }};


    //if (!"MOON".equalsIgnoreCase(refName)) {
    //g2.drawImage(earthImage, 0, 0, width, height, null);
    //} else {
    //	g2.drawImage(moonImage, 0, 0, getWidth(), getHeight(), this);
    //}

    moonSignalBoundary = createSignalBoundaryUsing(earthRadius, new double[]{moonPosList.get(0), moonPosList.get(1), moonPosList.get(2)});
    g2.setColor(Color.white);

    for(float[] scn:moonSignalBoundary)
    {
      Map<String,Double> screen = getScreenCoordsFor(new double[]{scn[0], scn[1], scn[2]});
      int x = (int)screen.get("X").doubleValue();
      int y = (int)screen.get("Y").doubleValue();
      g2.drawLine(x,y,x,y);
    }
    Map<String,Double> moonScreen = getScreenCoordsFor(new double[]{moonPos[0], moonPos[1], moonPos[2]});
    int xx = (int)moonScreen.get("X").doubleValue();
    int yy = (int)moonScreen.get("Y").doubleValue();
    g2.fillOval( xx - 3,  yy - 3, 6, 6);

    g2.setColor(Color.red);
    double[] rockVec = new double[]{rocketX, rocketY, rocketZ,0};
    List<float[]> rockSB = createSignalBoundaryUsing(earthRadius, rockVec);

    for(float[] scn:rockSB)
    {
      Map<String,Double> screen = getScreenCoordsFor(new double[]{scn[0], scn[1], scn[2]});
      int x = (int)screen.get("X").doubleValue();
      int y = (int)screen.get("Y").doubleValue();
      g2.drawLine(x,y,x,y);
    }

    Map<String, Double> dataMap = getScreenCoordsFor(new double[]{rocketX, rocketY, rocketZ});
    double latitude = dataMap.get("PHI");
    double longitude = dataMap.get("THETA");

    synchronized (trackHistoryList) {
      trackHistoryList.add(new double[]{dataMap.get("X"), dataMap.get("Y")});
      for (double[] pair : trackHistoryList) {

        g2.fillOval((int) pair[0] - 1, (int) pair[1] - 1, 2, 2);
      }
      if (trackHistoryList.size() > 3000) {
        trackHistoryList.remove(0);
      }
    }
    g2.setColor(Color.yellow);
    g2.setFont(new Font(Font.MONOSPACED, Font.BOLD, 11));
    g2.drawString("Lat= "+String.format("%8.4f",latitude)+"   Long= "+String.format("%9.4f",longitude) , (int)(width*0.5),height-15);
  }


  private Map<String,Double> getScreenCoordsFor(double[] vec3D)
  {
    double x = vec3D[0];
    double y = vec3D[1];
    double z = vec3D[2];

    Map<String, Double> result = new HashMap<String,Double>();
    double theta = Math.acos(x / Math.sqrt(x * x + y * y));

    if (y < 0) {
      theta = Math.PI * 2 - theta;
    }
    // position rocket's longitude
    theta = (theta + Math.PI * 4 - getDecimalTimeOfDay() * Math.PI / 12 - Math.toRadians(170))
            % (Math.PI * 2);

    double phi = Math.atan(z / (Math.sqrt(x * x + y * y)));

    // LN(tan(x)+sec(x))
    // result[1] = getHeight()/2 * (1 - Math.log(Math.abs(Math.tan(phi)+
    // 1/Math.cos(phi))));
    result.put("Y", new Double(height / 2 * (1 - Math.sin(phi))));
    result.put("X", new Double(width * theta / (Math.PI * 2)));
    result.put("THETA", new Double(Math.toDegrees(theta)-180.3));
    result.put("PHI", new Double(Math.toDegrees(phi)));
    return result;
  }

  private static double getDecimalTimeOfDay() {
    Calendar c = Calendar.getInstance();
    int hr = c.get(Calendar.HOUR_OF_DAY);
    int min = c.get(Calendar.MINUTE);
    int sec = c.get(Calendar.SECOND);
    int ms = c.get(Calendar.MILLISECOND);
    double result = hr + min / 60.0 + sec / 3600.0 + ms / (3600000.0);
    return result;
  }



  @Override
  public void destroy() throws Exception {
    rocketTrackingImage = null;
    trackHistoryList.clear();
    System.out.println(this.getClass().getCanonicalName()+" being destroyed. ******");
  }

  @Override
  public void afterPropertiesSet() throws Exception {

    //System.out.println("init getImage");
    try {
      Resource res = applicationContext.getResource("resources/default/img/Global_spatial_coverage_map.gif");
      earthImage = ImageIO.read(res.getInputStream());

      getSolarSystemImage();

    } catch (Exception e) {
      //System.out.println("img load failed");
    }
  }

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.applicationContext = applicationContext;
  }
}
