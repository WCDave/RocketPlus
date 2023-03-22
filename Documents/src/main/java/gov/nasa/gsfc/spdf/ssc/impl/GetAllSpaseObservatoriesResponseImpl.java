/*
 * XML Type:  getAllSpaseObservatoriesResponse
 * Namespace: http://ssc.spdf.gsfc.nasa.gov/
 * Java type: gov.nasa.gsfc.spdf.ssc.GetAllSpaseObservatoriesResponse
 *
 * Automatically generated - do not modify.
 */
package gov.nasa.gsfc.spdf.ssc.impl;
/**
 * An XML getAllSpaseObservatoriesResponse(@http://ssc.spdf.gsfc.nasa.gov/).
 *
 * This is a complex type.
 */
public class GetAllSpaseObservatoriesResponseImpl extends org.apache.xmlbeans.impl.values.XmlComplexContentImpl implements gov.nasa.gsfc.spdf.ssc.GetAllSpaseObservatoriesResponse
{
    private static final long serialVersionUID = 1L;
    
    public GetAllSpaseObservatoriesResponseImpl(org.apache.xmlbeans.SchemaType sType)
    {
        super(sType);
    }
    
    private static final javax.xml.namespace.QName RETURN$0 = 
        new javax.xml.namespace.QName("", "return");
    
    
    /**
     * Gets array of all "return" elements
     */
    public gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription[] getReturnArray()
    {
        synchronized (monitor())
        {
            check_orphaned();
            java.util.List targetList = new java.util.ArrayList();
            get_store().find_all_element_users(RETURN$0, targetList);
            gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription[] result = new gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription[targetList.size()];
            targetList.toArray(result);
            return result;
        }
    }
    
    /**
     * Gets ith "return" element
     */
    public gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription getReturnArray(int i)
    {
        synchronized (monitor())
        {
            check_orphaned();
            gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription target = null;
            target = (gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription)get_store().find_element_user(RETURN$0, i);
            if (target == null)
            {
                throw new IndexOutOfBoundsException();
            }
            return target;
        }
    }
    
    /**
     * Returns number of "return" element
     */
    public int sizeOfReturnArray()
    {
        synchronized (monitor())
        {
            check_orphaned();
            return get_store().count_elements(RETURN$0);
        }
    }
    
    /**
     * Sets array of all "return" element
     */
    public void setReturnArray(gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription[] xreturnArray)
    {
        synchronized (monitor())
        {
            check_orphaned();
            arraySetterHelper(xreturnArray, RETURN$0);
        }
    }
    
    /**
     * Sets ith "return" element
     */
    public void setReturnArray(int i, gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription xreturn)
    {
        synchronized (monitor())
        {
            check_orphaned();
            gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription target = null;
            target = (gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription)get_store().find_element_user(RETURN$0, i);
            if (target == null)
            {
                throw new IndexOutOfBoundsException();
            }
            target.set(xreturn);
        }
    }
    
    /**
     * Inserts and returns a new empty value (as xml) as the ith "return" element
     */
    public gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription insertNewReturn(int i)
    {
        synchronized (monitor())
        {
            check_orphaned();
            gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription target = null;
            target = (gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription)get_store().insert_element_user(RETURN$0, i);
            return target;
        }
    }
    
    /**
     * Appends and returns a new empty value (as xml) as the last "return" element
     */
    public gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription addNewReturn()
    {
        synchronized (monitor())
        {
            check_orphaned();
            gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription target = null;
            target = (gov.nasa.gsfc.spdf.ssc.SpaseObservatoryDescription)get_store().add_element_user(RETURN$0);
            return target;
        }
    }
    
    /**
     * Removes the ith "return" element
     */
    public void removeReturn(int i)
    {
        synchronized (monitor())
        {
            check_orphaned();
            get_store().remove_element(RETURN$0, i);
        }
    }
}
