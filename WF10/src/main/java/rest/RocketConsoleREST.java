package rest;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service("rest")
public class RocketConsoleREST implements IRocketData {

  private RestTemplate restTemplate = new RestTemplate();
  private static final Logger log = Logger.getLogger(RocketConsoleREST.class);
  
  @Autowired
  @Value(value="${webService.url}/rest")
  private String serviceURL ;

  @Override
  public Map getRocketData() {

    String url = serviceURL+"/rocketData/rd?x=ji";
    ResponseEntity<Map> re = restTemplate.getForEntity(url, Map.class);
    log.debug("rest ws call "+re.getBody().size());

    return re.getBody();
  }
}
