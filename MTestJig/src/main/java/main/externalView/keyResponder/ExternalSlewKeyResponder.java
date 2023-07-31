package main.externalView.keyResponder;

import RVMath.VMath;
import main.Craft;
import main.ExternalView;
import main.externalView.positioning.ExternalViewPositioner;
import orbits.CoordSys;
import orbits.Sphere;
import orbits.World3DContainer;

import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

import org.apache.log4j.Logger;

public class ExternalSlewKeyResponder implements IKeyResponder<KeyEvent> {

	private static final float rateInc = 0.2f;
	final float AUtoMeters = 149597870300.9203f;

	private ExternalView view;
	private Logger log = Logger.getLogger(ExternalSlewKeyResponder.class);

	private float spd;
	private double[] velVec = new double[4];

	public ExternalSlewKeyResponder(ExternalView view) {
		this.view = view;
	}

	@Override
	public void respondToKeyPressed(KeyEvent keyEvent) {

		switch (keyEvent.getKeyCode()) {
		case KeyEvent.VK_NUMPAD2:
			view.getCoordSys().xRotate((float) rateInc);
			break;
		case KeyEvent.VK_NUMPAD8:
			view.getCoordSys().xRotate((float) -rateInc);
			break;
		case KeyEvent.VK_NUMPAD4:
			view.getCoordSys().zRotate((float) rateInc);
			break;
		case KeyEvent.VK_NUMPAD6:
			view.getCoordSys().zRotate((float) -rateInc);
			break;
		case KeyEvent.VK_NUMPAD1:
			view.getCoordSys().yRotate((float) -rateInc);
			break;
		case KeyEvent.VK_NUMPAD3:
			view.getCoordSys().yRotate((float) rateInc);
			break;
		case KeyEvent.VK_EQUALS:
			spd = keyEvent.isShiftDown() ? (float) 0.0000001 * AUtoMeters : (float) 0.000001 * AUtoMeters;
			break;
		case KeyEvent.VK_MINUS:
			spd = keyEvent.isShiftDown() ? (float) -0.0000001 * AUtoMeters : (float) -0.000001 * AUtoMeters;
			break;
		case KeyEvent.VK_SPACE:
			log.info("craft change");
			if ("Test1".equals(view.getCraft().getName())) {
				view.setCraft((Craft) World3DContainer.getInstance().getItem("mud"));
			} else {
				view.setCraft((Craft) World3DContainer.getInstance().getItem("Test1"));
			}
			break;
		case KeyEvent.VK_SEMICOLON:
			view.setViewingCoordSys((CoordSys) view.getInitialCoordSys().clone());
			break;
		case KeyEvent.VK_0:
			new ExternalViewPositioner("Test1", view.getCoordSys(), "mud").positionViewingSys();
			break;
		case KeyEvent.VK_1:
			new ExternalViewPositioner(2, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_2:
			new ExternalViewPositioner(3, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_3:
			new ExternalViewPositioner(0, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_4:
			new ExternalViewPositioner(4, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_5:
			new ExternalViewPositioner(5, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_6:
			new ExternalViewPositioner(6, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_7:
			new ExternalViewPositioner(7, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_8:
			new ExternalViewPositioner(8, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_9:
			new ExternalViewPositioner(9, view.getCoordSys()).positionViewingSys();
			break;
		case KeyEvent.VK_M:
			new ExternalViewPositioner("Moon", view.getCoordSys(), "Earth").positionViewingSys();
			break;

		case KeyEvent.VK_SLASH:
			if((keyEvent.getModifiersEx() & InputEvent.SHIFT_DOWN_MASK) != 0 )
				view.getCoordSys().setViewDirection(view.getCoordSys().getViewDirection().getPrevious());
			else
				view.getCoordSys().setViewDirection(view.getCoordSys().getViewDirection().getNext());
			break;

		}
		if (spd != 0) {
			velVec = VMath.vecMultByScalar(view.getCoordSys().zAxis().getVectorForm(), spd);
			double[] tempVec = VMath.vecAdd(view.getCoordSys().getPositionVec(), velVec);
			view.getCoordSys().setPositionAsVec(tempVec);
			spd = 0;
		}
	}

	@Override
	public void respondToKeyReleased(KeyEvent keyEvent) {

	}
}
