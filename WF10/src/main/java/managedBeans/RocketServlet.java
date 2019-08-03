package managedBeans;

import beans.RocketDataViewBean;
import enums.OrbitElementKeys;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.faces.context.FacesContext;
import javax.imageio.ImageIO;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.applet.Applet;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import java.util.List;

@Component("rocketServlet")
public class RocketServlet extends HttpServlet  {
  @Autowired
  RocketDataService rocketDataService;

  @Autowired
  RocketDataViewBean rocketDataView;

  @Override
  public void init(ServletConfig config) throws ServletException {
    super.init(config);
    SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
            config.getServletContext());
  }


  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    rocketDataView.updateMap(rocketDataService.updateData());
    resp.setContentType("image/gif");
    OutputStream out = resp.getOutputStream();
    ImageIO.write(rocketDataView.getRocketTrackingImage(), "gif", out);
    out.flush();
    out.close();
  }
}
