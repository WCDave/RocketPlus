package main;


import orbits.Abstract3DModelObject;

import java.util.Arrays;
import java.util.List;

public class ArrayWrapper<T extends Abstract3DModelObject> {

  private Abstract3DModelObject[] array;
  private int nextIdx;

  public ArrayWrapper(int size) {
    array = new Abstract3DModelObject[size];
  }

  public <E extends Abstract3DModelObject> void add(E obj) {
    array[nextIdx++] = obj;
  }

  public void clear() {
    nextIdx = 0;
  }

  public int size() {
    return nextIdx;
  }

  public Abstract3DModelObject get(int idx) {
    return array[idx];
  }

  public void sort() {
    Arrays.sort(array, 0, nextIdx);
  }

  public List<T> getList() {
    return (List<T>) Arrays.asList(array);
  }
  
  public void pruneList() {
//	  System.out.println(nextIdx);
	  if(nextIdx > 1500) {
		  Abstract3DModelObject[] target = new Abstract3DModelObject[15000];
		  System.arraycopy(array, nextIdx/2, target, 0, nextIdx/2);
		  array = target;
		  nextIdx = nextIdx/2-1;
	  }
  }
}
