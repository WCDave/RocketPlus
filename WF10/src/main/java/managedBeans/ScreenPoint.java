package managedBeans;

import java.awt.*;

public class ScreenPoint extends Point {
	
	private boolean isInView; 
	
	public ScreenPoint(int x, int y, boolean inView){
		super(x,y);
		isInView=inView;
	}

	public boolean isInView() {
		return isInView;
	}

}
