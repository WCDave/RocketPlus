package domain;



/**
 * OrderdetailId entity. @author MyEclipse Persistence Tools
 */
public class OrderdetailId extends AbstractOrderdetailId implements java.io.Serializable {

    // Constructors

    /** default constructor */
    public OrderdetailId() {
    }

    
    /** full constructor */
    public OrderdetailId(Integer purchaseordernumber, String productcode) {
        super(purchaseordernumber, productcode);        
    }
   
}
