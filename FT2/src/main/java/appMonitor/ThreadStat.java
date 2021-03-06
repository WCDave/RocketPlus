package appMonitor;

import org.apache.log4j.Logger;

public class ThreadStat {
	
	private String URI;
	private String sessionId;
	private  final Logger log = Logger
	.getLogger(ThreadStat.class);
	
	private static InheritableThreadLocal<ThreadStat> local = new InheritableThreadLocal<ThreadStat>(){};
	
	
	public ThreadStat(){
		local.set(this);
	}
	
	public static ThreadStat getInstance(){
		return local.get();
	}
	
	public void clean()
	{
		local.set(null);
	}

	public void setURI(String URI) {
		this.URI = URI;
	}

	public String getURI() {
		return URI;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getSessionId() {
		return sessionId;
	}
	
	@Override
	protected void finalize() throws Throwable
	{
		log.debug("Finalizing");
		super.finalize();
	}

}
