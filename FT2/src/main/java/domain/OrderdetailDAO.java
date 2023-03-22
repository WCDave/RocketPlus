package domain;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;


/**
 	* A data access object (DAO) providing persistence and search support for Orderdetail entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see domain.Orderdetail
  * @author MyEclipse Persistence Tools 
 */

public class OrderdetailDAO extends HibernateDaoSupport  {
	     private static final Logger log = Logger.getLogger(OrderdetailDAO.class);
		//property constants
	public static final String QUANTITYORDERED = "quantityordered";
	public static final String PRICEEACH = "priceeach";
	public static final String ORDERLINENUMBER = "orderlinenumber";



    
    public void save(Orderdetail transientInstance) {
        log.debug("saving Orderdetail instance");
        try {
            getSession().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(Orderdetail persistentInstance) {
        log.debug("deleting Orderdetail instance");
        try {
            getSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public Orderdetail findById( domain.OrderdetailId id) {
        log.debug("getting Orderdetail instance with id: " + id);
        try {
            Orderdetail instance = (Orderdetail) getSession()
                    .get("domain.Orderdetail", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    
    public List findByExample(Orderdetail instance) {
        log.debug("finding Orderdetail instance by example");
        try {
            List results = getSession()
                    .createCriteria("domain.Orderdetail")
                    .add(Example.create(instance))
            .list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }    
    
    public List findByProperty(String propertyName, Object value) {
      log.debug("finding Orderdetail instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from Orderdetail as model where model." 
         						+ propertyName + "= ?";
         Query queryObject = getSession().createQuery(queryString);
		 queryObject.setParameter(0, value);
		 return queryObject.list();
      } catch (RuntimeException re) {
         log.error("find by property name failed", re);
         throw re;
      }
	}

	public List findByQuantityordered(Object quantityordered
	) {
		return findByProperty(QUANTITYORDERED, quantityordered
		);
	}
	
	public List findByPriceeach(Object priceeach
	) {
		return findByProperty(PRICEEACH, priceeach
		);
	}
	
	public List findByOrderlinenumber(Object orderlinenumber
	) {
		return findByProperty(ORDERLINENUMBER, orderlinenumber
		);
	}
	

	public List findAll() {
		log.debug("finding all Orderdetail instances");
		try {
			String queryString = "from Orderdetail";
	         Query queryObject = getSession().createQuery(queryString);
			 return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public Orderdetail merge(Orderdetail detachedInstance) {
        log.debug("merging Orderdetail instance");
        try {
            Orderdetail result = (Orderdetail) getSession()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(Orderdetail instance) {
        log.debug("attaching dirty Orderdetail instance");
        try {
            getSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(Orderdetail instance) {
        log.debug("attaching clean Orderdetail instance");
        try {
            getSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
}